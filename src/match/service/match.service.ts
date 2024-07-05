import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../entities/match.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { TagList } from '../entities/tagList.entity';
import { SelectedTagDto } from '../dtos/selectedTag.dto';
import { MatchDto } from '../dtos/match.dto';
import { ConsultantQueryDto } from '../dtos/consultantQuery.dto';
import UpdateUserDto from '../dtos/updateUser.dto';
import { ConsultingJournal } from '../entities/consutingJournal.entity';
import { MentoringApp } from 'src/mentoringapp/entities/mentoringapp.entity';
import { CreateJournalDto } from '../dtos/createJournal.dto';
import { S3Upload, uploadToS3 } from 'src/utills/s3Upload';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import checkUserRoles from 'src/utills/checkRole';
import ReviewDto from '../dtos/review.dto';
import { DataSource } from 'typeorm';
import { Video } from 'src/video/video.entity';
import { Supervisor } from 'src/auth/supervisor.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(TagList)
    private readonly tagListRepository: Repository<TagList>,

    @InjectRepository(ConsultingJournal)
    private readonly journalRepository: Repository<ConsultingJournal>,

    @InjectRepository(BuildUpBmds)
    private readonly buildRepository: Repository<BuildUpBmds>,

    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,

    private readonly dataSource: DataSource,
  ) {}

  //* 컨설턴트가 전문 태그(분야로 바뀜) 입력
  async selectTag(userId: number, dtos: SelectedTagDto[]): Promise<void> {
    dtos.forEach((dto) => {
      switch (dto.tagName) {
        case '경영일반(사업화전략)':
          dto.tagName = '경영일반(사업화전략)';
          break;
        case 'BM수립 및 고도화':
          dto.tagName = 'BM수립 및 고도화';
          break;
        case '투자유치(IR전략)':
          dto.tagName = '투자유치(IR전략)';
          break;
        case 'R&D 지원':
          dto.tagName = 'R&D 지원';
          break;
        case '영업/마케팅':
          dto.tagName = '영업/마케팅';
          break;
        case '특허/법률':
          dto.tagName = '특허/법률';
          break;
        case '재무/회계':
          dto.tagName = '재무/회계';
          break;
        case '정부지원연계':
          dto.tagName = '정부지원연계';
          break;
        case '기타':
          if (!dto.tagDetail)
            throw new HttpException(
              '카테고리 상세를 입력해주세요.',
              HttpStatus.BAD_REQUEST,
            );
          dto.tagName = dto.tagDetail;
          break;
        default:
          throw new HttpException(
            '존재하지 않는 카테고리입니다.',
            HttpStatus.BAD_REQUEST,
          );
      }
    });

    const user = await this.userRepository.findOne({
      where: { id: userId, deleteYn: 'N' },
    });
    if (!user) {
      throw new HttpException(
        '유저정보를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    checkUserRoles(user, ['s-consultant', 'g-consultant']);

    await this.dataSource.query('DELETE FROM TagList WHERE userId = ?', [
      userId,
    ]);

    for (const dto of dtos) {
      const tag = await this.tagListRepository.create({
        userId,
        tagName: dto.tagName,
      });
      await this.tagListRepository.save(tag);
    }
  }

  //* 컨설턴트가 자신의 전문 태그(분야로 바뀜) 조회
  async getTag(
    id: number,
    currentPage: number,
    pageSize = 10,
  ): Promise<TagList[]> {
    if (!currentPage) {
      currentPage = 1;
    }

    const skip = (currentPage - 1) * pageSize;

    const tag = await this.tagListRepository.find({
      where: { userId: id },
      skip: skip,
    });

    return tag;
  }

  //* 컨설턴트가 자신의 전문 태그(분야로 바뀜) 삭제
  async deleteTag(id: number): Promise<void> {
    const tag = await this.tagListRepository.findOne({ where: { id } });
    if (!tag) {
      throw new HttpException(
        '존재하지 않는 태그 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.tagListRepository.remove(tag);
  }

  //* 컨설턴트 단일 조회
  async getConsultant(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deleteYn: 'N' },
    });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tags', 'tags')
      .where('user.id = :id', { id })
      .andWhere('user.role = :role', { role: 'g-consultant' })
      .andWhere('user.affiliationGroup = :affiliationGroup', {
        affiliationGroup: user.affiliationGroup,
      })
      .andWhere('user.deleteYn = :deleteYn', { deleteYn: 'N' })
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.company',
        'user.role',
        'tags',
      ]);

    checkUserRoles(user, ['s-consultant', 'g-consultant']);
    const res = await queryBuilder.getOne();
    return res;
  }

  //* 유저가 전문 태그 필터링하여(분야로 바뀜) 컨설턴트 조회
  async getConsultantByTag(
    userId: number,
    page: number,
    pageSize: number,
    tags?: string[],
  ): Promise<User[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId, deleteYn: 'N' },
    });

    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tags', 'tags')
      .where('user.role = :role', { role: 'g-consultant' })
      .andWhere('user.affiliationGroup = :affiliationGroup', {
        affiliationGroup: user.affiliationGroup,
      })
      .andWhere('user.deleteYn = :deleteYn', { deleteYn: 'N' })
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.company',
        'user.role',
        'tags',
      ]);
    if (tags.length > 0) {
      queryBuilder.andWhere('tags.tagName IN (:...tags)', { tags });
    }

    const results = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return results;
  }

  //* 매칭 요청 (유저가 컨설턴트에게)
  async requestMatch(dto: MatchDto): Promise<Match> {
    if (dto.category) {
      switch (dto.category) {
        case '경영일반(사업화전략)':
          dto.category = '경영일반(사업화전략)';
          break;
        case 'BM수립 및 고도화':
          dto.category = 'BM수립 및 고도화';
          break;
        case '투자유치(IR전략)':
          dto.category = '투자유치(IR전략)';
          break;
        case 'R&D 지원':
          dto.category = 'R&D 지원';
          break;
        case '영업/마케팅':
          dto.category = '영업/마케팅';
          break;
        case '특허/법률':
          dto.category = '특허/법률';
          break;
        case '재무/회계':
          dto.category = '재무/회계';
          break;
        case '정부지원연계':
          dto.category = '정부지원연계';
          break;
        case '기타':
          if (!dto.categoryDetail)
            throw new HttpException(
              '카테고리 상세를 입력해주세요.',
              HttpStatus.BAD_REQUEST,
            );
          dto.category = dto.categoryDetail;
          break;
        default:
          throw new HttpException(
            '존재하지 않는 카테고리입니다.',
            HttpStatus.BAD_REQUEST,
          );
      }
    }
    const user = await this.userRepository.findOne({
      where: { id: dto.generalUserId, deleteYn: 'N' },
    });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const match = await this.matchRepository.create({
      ...dto,
      matchedState: 'request',
    });
    return await this.matchRepository.save(match);
  }

  //* 매칭 요청 취소 (유저가 컨설턴트에게)
  async cancelMatch(
    id: number,
    generalUserId: number,
    consultantUserId: number,
    buildId: number,
  ): Promise<void> {
    const match = await this.matchRepository.findOne({
      where: {
        id,
        consultantUserId,
        generalUserId,
        buildId,
      },
    });
    if (!match) {
      throw new HttpException(
        '존재하지 않는 매칭 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (match.matchedState !== 'request') {
      throw new HttpException(
        '요청 상태의 매칭 정보가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.matchRepository.remove(match);
  }

  //* 매칭 거절 (컨설턴트가 유저에게)
  async rejectMatch(dto: MatchDto): Promise<Match> {
    const user = await this.userRepository.findOne({
      select: ['id', 'role'],
      where: { id: dto.consultantUserId, deleteYn: 'N' },
    });
    checkUserRoles(user, [
      's-consultant',
      'g-consultant',
      's-supervisor',
      'g-supervisor',
      'admin',
    ]);
    const match = await this.matchRepository.findOne({
      where: {
        id: dto.id,
        consultantUserId: dto.consultantUserId,
        generalUserId: dto.generalUserId,
        buildId: dto.buildId,
      },
    });
    if (!match) {
      throw new HttpException(
        '존재하지 않는 매칭 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (match.matchedState !== 'request') {
      throw new HttpException(
        '요청 상태의 매칭 정보가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    // match.endDate = new Date();
    match.matchedState = 'reject';
    return await this.matchRepository.save(match);
  }

  //* 매칭 수락 (컨설턴트가 유저에게)
  async acceptMatch(dto: MatchDto): Promise<Match> {
    const user = await this.userRepository.findOne({
      select: ['id', 'role'],
      where: { id: dto.consultantUserId, deleteYn: 'N' },
    });
    checkUserRoles(user, [
      's-consultant',
      'g-consultant',
      's-supervisor',
      'g-supervisor',
      'admin',
    ]);
    const match = await this.matchRepository.findOne({
      where: {
        id: dto.id,
        consultantUserId: dto.consultantUserId,
        generalUserId: dto.generalUserId,
        buildId: dto.buildId,
      },
    });
    if (!match) {
      throw new HttpException(
        '존재하지 않는 매칭 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (match.matchedState !== 'request' && match.matchedState !== 'reject') {
      throw new HttpException(
        '요청 또는 거절 상태의 매칭 정보가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    match.matchedDate = new Date();
    match.endDate = null;
    match.matchedState = 'accept';
    return await this.matchRepository.save(match);
  }

  //* 매칭 완료 (컨설턴트가 유저에게)
  async completeMatch(dto: MatchDto): Promise<Match> {
    const user = await this.userRepository.findOne({
      select: ['id', 'role'],
      where: { id: dto.consultantUserId, deleteYn: 'N' },
    });
    checkUserRoles(user, [
      's-consultant',
      'g-consultant',
      's-supervisor',
      'g-supervisor',
      'admin',
    ]);
    const match = await this.matchRepository.findOne({
      where: {
        id: dto.id,
        consultantUserId: dto.consultantUserId,
        generalUserId: dto.generalUserId,
        buildId: dto.buildId,
      },
    });
    if (!match) {
      throw new HttpException(
        '존재하지 않는 매칭 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (match.matchedState !== 'accept') {
      throw new HttpException(
        '수락 상태의 매칭 정보가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    match.endDate = new Date();
    match.matchedState = 'complete';
    return await this.matchRepository.save(match);
  }

  //* 컨설팅 완료 (컨설턴트가 유저에게)
  async completeConsulting(dto: MatchDto): Promise<Match> {
    const user = await this.userRepository.findOne({
      select: ['id', 'role'],
      where: { id: dto.consultantUserId, deleteYn: 'N' },
    });
    checkUserRoles(user, [
      's-consultant',
      'g-consultant',
      's-supervisor',
      'g-supervisor',
      'admin',
    ]);
    const match = await this.matchRepository.findOne({
      where: {
        id: dto.id,
        consultantUserId: dto.consultantUserId,
        generalUserId: dto.generalUserId,
        buildId: dto.buildId,
      },
    });
    if (!match) {
      throw new HttpException(
        '존재하지 않는 매칭 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (match.matchedState !== 'accept') {
      throw new HttpException(
        '수락 상태의 매칭 정보가 아닙니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    match.endDate = new Date();
    match.matchedState = 'consultingComplete';
    return await this.matchRepository.save(match);
  }

  //* 매칭 정보 조회 (일반유저)
  async getMatch(
    id: number,
    currentPage: number,
    pageSize: number,
  ): Promise<{ data: Match[]; count: number }> {
    const skip = (currentPage - 1) * pageSize;

    const [data, count] = await this.matchRepository.findAndCount({
      where: { generalUserId: id },
      take: pageSize,
      skip: skip,
      relations: ['consultantUser', 'generalUser', 'build'],
    });
    return { data, count };
  }

  //* 매칭 정보 조회 (전체)(관리자)
  async getAllMatchAdmin(
    id: number,
    currentPage: number,
    pageSize: number,
  ): Promise<Match[]> {
    const skip = (currentPage - 1) * pageSize;

    const admin = await this.userRepository.findOne({
      where: { id, deleteYn: 'N' },
    });
    checkUserRoles(admin, ['admin']);

    const queryBuilder = this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.consultantUser', 'consultantUser')
      .leftJoinAndSelect('match.generalUser', 'generalUser')
      .leftJoinAndSelect('match.build', 'build')
      .select([
        'match', // select all fields from match
        'consultantUser.id',
        'consultantUser.name',
        'consultantUser.phoneNum',
        'consultantUser.company',
        'consultantUser.address',
        'consultantUser.role',
        // 'consultantUser.gender',
        'generalUser.id',
        'generalUser.name',
        'generalUser.phoneNum',
        'generalUser.company',
        'generalUser.address',
        'generalUser.role',
        // 'generalUser.gender',
        'build', // select all fields from build
      ])
      .take(pageSize)
      .skip(skip);

    const matches = await queryBuilder.getMany();
    return matches;
  }

  //* 매칭 정보 조회 (전체)(supervisor)
  async getAllMatchSupervisor(
    id: number,
    currentPage: number,
    pageSize: number,
  ): Promise<Match[]> {
    const skip = (currentPage - 1) * pageSize;

    const supervisor = await this.userRepository.findOne({
      where: { id, deleteYn: 'N' },
    });
    checkUserRoles(supervisor, ['s-supervisor', 'g-supervisor']);

    const queryBuilder = this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.consultantUser', 'consultantUser')
      .leftJoinAndSelect('match.generalUser', 'generalUser')
      .leftJoinAndSelect('match.build', 'build')
      .select([
        'match', // select all fields from match
        'consultantUser.id',
        'consultantUser.name',
        'consultantUser.phoneNum',
        'consultantUser.company',
        'consultantUser.address',
        'consultantUser.role',
        // 'consultantUser.gender',
        'generalUser.id',
        'generalUser.name',
        'generalUser.phoneNum',
        'generalUser.company',
        'generalUser.address',
        'generalUser.role',
        // 'generalUser.gender',
        'build', // select all fields from build
      ])
      .where('consultantUser.affiliationGroup = :affiliationGroup', {
        affiliationGroup: supervisor.affiliationGroup,
      })
      .take(pageSize)
      .skip(skip);

    const matches = await queryBuilder.getMany();
    return matches;
  }

  //* 유저 리스트 조회 (관리자)
  async getUserListByAdmin(
    id: number,
    currentPage: number,
    pageSize: number,
    role?: string,
  ): Promise<{ data: User[]; count: number }> {
    const skip = (currentPage - 1) * pageSize;

    const supervisor = await this.userRepository.findOne({
      where: { id, deleteYn: 'N' },
    });
    checkUserRoles(supervisor, ['admin']);
    if (role) {
      const [data, count] = await this.userRepository.findAndCount({
        take: pageSize,
        skip: skip,
        select: [
          'id',
          'name',
          'email',
          'company',
          'role',
          // 'gender',
          'affiliationGroup',
          'createdAt',
        ],
        where: {
          deleteYn: 'N',
          role: role,
        },
      });
      return { data, count };
    } else {
      const [data, count] = await this.userRepository.findAndCount({
        take: pageSize,
        skip: skip,
        select: [
          'id',
          'name',
          'email',
          'company',
          'role',
          // 'gender',
          'affiliationGroup',
          'createdAt',
        ],
        where: {
          deleteYn: 'N',
          role: In(['common', 'buildup', 'premium', 'student', 'tester']),
        },
      });

      return { data, count };
    }
  }

  //* 유저 리스트 조회 (슈퍼바이저)
  async getUserListBySupervisor(
    id: number,
    currentPage: number,
    pageSize: number,
    role?: string,
  ): Promise<{ data: User[]; count: number }> {
    const skip = (currentPage - 1) * pageSize;

    const supervisor = await this.userRepository.findOne({
      where: { id, deleteYn: 'N' },
    });
    checkUserRoles(supervisor, ['s-supervisor', 'g-supervisor']);

    if (role) {
      const [data, count] = await this.userRepository.findAndCount({
        take: pageSize,
        skip: skip,
        select: [
          'id',
          'name',
          'email',
          'company',
          'role',
          // 'gender',
          'affiliationGroup',
          'createdAt',
        ],
        where: {
          deleteYn: 'N',
          role: role,
          affiliationGroup: supervisor.affiliationGroup,
        },
      });
      return { data, count };
    } else {
      const [data, count] = await this.userRepository.findAndCount({
        take: pageSize,
        skip: skip,
        select: ['id', 'name', 'email', 'company', /* 'gender', */ 'role'],
        where: {
          deleteYn: 'N',
          role: In(['common', 'buildup', 'premium', 'student', 'tester']),
          affiliationGroup: supervisor.affiliationGroup,
        },
      });

      return { data, count };
    }
  }

  //* 단일 유저 정보 조회 (관리자급만)
  async getUserDetailByAdmin(id: number, userId: number): Promise<User> {
    const admin = await this.userRepository.findOne({
      where: { id, deleteYn: 'N' },
    });
    checkUserRoles(admin, ['admin']);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  //* 단일 유저 정보 조회 (슈퍼바이저)
  async getUserDetailBySuperVisor(id: number, userId: number): Promise<User> {
    const supervisor = await this.userRepository.findOne({
      where: { id, deleteYn: 'N' },
    });
    checkUserRoles(supervisor, ['s-supervisor', 'g-supervisor']);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'name',
        'email',
        'company',
        'role',
        'affiliationGroup',
        'createdAt',
        // 'gender',
        'phoneNum',
      ],
    });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  //* 유저 정보 수정 (관리자급만)
  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  //* 유저 정보 삭제 (관리자급만)
  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    user.deleteYn = 'Y';
    return await this.userRepository.save(user);
  }

  //* 유저 정보 복구 (관리자급만)
  async restoreUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deleteYn: 'Y' },
    });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    user.deleteYn = 'N';
    return await this.userRepository.save(user);
  }

  //* 컨설턴트가 자신의 매칭 정보 조회
  async getConsultantMatch(
    id: number,
    currentPage: number,
    pageSize: number,
  ): Promise<Match[]> {
    const skip = (currentPage - 1) * pageSize;

    const match = await this.matchRepository.find({
      where: { consultantUserId: id },
      take: pageSize,
      skip: skip,
      relations: ['consultantUser', 'generalUser', 'build'],
    });

    return match;
  }

  //* 컨설턴트가 자신의 매칭 정보에서 유저 단일 정보 조회
  async getConsultantMatchUser(id: number): Promise<User> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['generalUser'],
    });

    if (!match || !match.generalUser) {
      throw new HttpException(
        '존재하지 않는 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: match.generalUserId },
      select: [
        'id',
        'name',
        'email',
        'company',
        'role',
        'address',
        'phoneNum',
        // 'gender',
      ],
    });

    return user;
  }

  //* 컨설턴트가 자신과 매칭된 유저의 bmds 조회
  async getConsultantMatchBmds(id: number): Promise<BuildUpBmds[]> {
    const match = await this.matchRepository.findOne({
      where: { id },
    });

    const bmds = await this.buildRepository.find({
      where: { userId: match.generalUserId },
    });

    return bmds;
  }

  //* 컨설턴트가 일지작성시에 매칭된 bmds정보 조회
  async getConsultantMatchBmdsByJournal(id: number): Promise<Match[]> {
    const match = await this.matchRepository.findOne({
      where: { id, matchedState: 'accept' },
      select: ['id', 'generalUserId'],
      relations: ['generalUser', 'generalUser.buildUpBmds'],
    });

    if (!match || !match.generalUser) {
      throw new HttpException(
        '존재하지 않는 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const bmList = [];
    for (const item of match.generalUser.buildUpBmds) {
      bmList.push(item);
    }

    console.log(bmList);

    return bmList;
  }
  //* 컨설턴트가 일지작성시에 매칭된 bmds정보 단일조회
  async getConsultantMatchBmdsByJournalOne(
    id: number,
    buildId: number,
  ): Promise<Match[]> {
    const match = await this.matchRepository.findOne({
      where: {
        id,
        buildId,
        // matchedState: In(['accept', 'complete', 'consultingComplete']),
      },
      select: [
        'id',
        'resultReport',
        'resultReportName',
        'generalUserId',
        'matchedState',
      ],
      relations: ['generalUser', 'generalUser.buildUpBmds'],
    });

    if (!match || !match.generalUser) {
      throw new HttpException(
        '존재하지 않는 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const bm = [];
    for (const item of match.generalUser.buildUpBmds) {
      if (item.id === buildId) {
        bm.push(item);
      }
    }
    bm[0].matchedState = match.matchedState;
    bm[0].resultReport = match.resultReport;
    bm[0].resultReportName = match.resultReportName;
    return bm;
  }

  //* 컨설턴트가 자신의 매칭 상대에게 컨설팅 일지 작성
  async createJournal(
    consultantId: number,
    dto: CreateJournalDto,
    textFile: Express.Multer.File | null,
    images: Express.Multer.File[] | null,
  ): Promise<ConsultingJournal> {

    // 멘토정보 가져오기
    const consultant = await this.userRepository.findOne({
      where: { id: consultantId },
    });
    checkUserRoles(consultant, [
      's-consultant',
      'g-consultant',
      's-supervisor',
      'g-supervisor',
      'supervisor',
      'buildup',
      'admin',
    ]);

    // BM 가져오기
    const generalUserId = await this.buildRepository.findOne({
      where: { id: dto.buildId },
    });

    console.log(dto);

    const journal = await this.journalRepository.create({
      ...dto,
      consultantUserId: consultantId,
      generalUserId: generalUserId.userId,
      
    });

    journal.createdAt = new Date();
    journal.performanceDate = new Date(dto.performanceDate);
    journal.deletedYn = 'N';

    if (images && images.length > 0) {
      const uploadPromises = images.map((file) => uploadToS3(file));
      const uploadResults = await Promise.all(uploadPromises);

      uploadResults.forEach((result, index) => {
        if (index === 0) journal.img1 = result.Location;
        if (index === 1) journal.img2 = result.Location;
      });
    }

    if (textFile) {
      const txtFile = S3Upload(textFile);
      journal.hanFile = (await txtFile).downloadUrl;
      journal.hanFileName = (await txtFile).filename;
    }

    return await this.journalRepository.save(journal);
  }

  //* 컨설턴트가 자신의 컨설팅 일지 조회
  async getConsultingJournal(
    consultantId: number,
    currentPage: number,
    pageSize: number,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {
    const skip = (currentPage - 1) * pageSize;

    const [data, count] = await this.journalRepository.findAndCount({
      where: { consultantUserId: consultantId, deletedYn: 'N' },
      skip: skip,
      take: pageSize,
    });

    return { data, count };
  }

   //* 컨설팅 일지 목록 조회
   async loadJournalList(
      dto: CreateJournalDto
  ): Promise<{ data: ConsultingJournal[]; }> {
    
    const journalList = await this.dataSource.query(
      `
      SELECT cj.id 
           , cj.degree
           , cj.subject
           , cj.createdAt 
           , DATE_FORMAT(cj.createdAt, '%Y.%m.%d') AS createAtFormat
      FROM ConsultingJournal cj
      WHERE 1 = 1
            AND cj.appId = ?
      `,
      [dto.appId],
    );
    
    return  journalList;
  }

  //* 컨설턴트가 자신의 컨설팅 일지 단일 조회
  async getConsultingJournalById(
    consultantId: number,
    journalId: number,
  ): Promise<ConsultingJournal> {
    const journal = await this.journalRepository.findOne({
      where: { id: journalId, consultantUserId: consultantId, deletedYn: 'N' },
    });

    if (!journal) {
      throw new HttpException(
        '존재하지 않는 컨설팅 일지 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    return journal;
  }

  //* 컨설턴트가 자신이 작성한 컨설팅 일지 수정
  async updateConsultingJournal(
    journalId: number,
    dto: CreateJournalDto,
    textFile: Express.Multer.File | null,
    images: Express.Multer.File[] | null,
  ): Promise<ConsultingJournal> {
    const journal = await this.journalRepository.findOne({
      where: { id: journalId },
    });

    if (!journal) {
      throw new HttpException(
        '존재하지 않는 컨설팅 일지 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    Object.assign(journal, dto);

    journal.updatedAt = new Date();
    journal.performanceDate = new Date(dto.performanceDate);

    if (images && images.length > 0) {
      const uploadPromises = images.map((file) => uploadToS3(file));
      const uploadResults = await Promise.all(uploadPromises);

      uploadResults.forEach((result, index) => {
        if (index === 0) journal.img1 = result.Location;
        if (index === 1) journal.img2 = result.Location;
      });
    }
    if (textFile) {
      const txtFile = S3Upload(textFile);
      journal.hanFile = (await txtFile).downloadUrl;
      journal.hanFileName = (await txtFile).filename;
    }
    return await this.journalRepository.save(journal);
  }

  //* 컨설턴트가 자신의 컨설팅 일지 삭제
  async deleteConsultingJournal(journalId: number): Promise<ConsultingJournal> {
    const journal = await this.journalRepository.findOne({
      where: { id: journalId },
    });

    if (!journal) {
      throw new HttpException(
        '존재하지 않는 컨설팅 일지 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    journal.deletedAt = new Date();
    journal.deletedYn = 'Y';

    return await this.journalRepository.save(journal);
  }

  //* 컨설턴트가 특정 유저와 매칭된 다른 컨설턴트가 작성한 컨설팅 일지의 summary 조회
  async getConsultingJournalSummary(
    consultantId: number,
    buildId: number,
  ): Promise<(ConsultingJournal | string)[]> {
    const match = await this.matchRepository.find({
      where: { buildId: buildId, matchedState: 'accept' },
      relations: ['build', 'build.consutJournals'],
    });

    let journals: (ConsultingJournal | string)[] = [];
    match.forEach((item) => {
      if (item.consultantUserId === consultantId) {
        journals = journals.concat(item.build.consutJournals);
      } else {
        const journalSummaries = item.build.consutJournals.map(
          (journal) => journal.summary,
        );
        journals = journals.concat(journalSummaries);
      }
    });

    return journals;
  }

  //* 유저가 자신의 bmds에 작성된 멘토링 일지 조회
  async getMentoringJournal(
    userId: number,
    currentPage: number,
    pageSize: number,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {
    const skip = (currentPage - 1) * pageSize;
    const bmdsList = await this.buildRepository.find({
      where: { userId: userId },
      select: ['id'],
    });
    const resultData: ConsultingJournal[] = [];
    let totalCount = 0;

    for (const bmdsItem of bmdsList) {
      const match = await this.matchRepository.findOne({
        where: { buildId: bmdsItem.id },
      });

      if (!match) {
      } else {
        const [data, count] = await this.journalRepository.findAndCount({
          where: { buildId: bmdsItem.id, deletedYn: 'N' },
          skip: skip,
          take: pageSize,
        });

        resultData.push(...data);
        totalCount += count;
      }
    }

    return { data: resultData, count: totalCount };
  }

  //* 유저가 자신의 bmds에 작성된 멘토링 일지 단일 조회
  async getMentoringJournalById(
    userId: number,
    journalId: number,
  ): Promise<ConsultingJournal> {
    const bmds = await this.buildRepository.findOne({
      where: { userId: userId },
      select: ['id'],
    });
    const journal = await this.journalRepository.findOne({
      where: { id: journalId, buildId: bmds.id, deletedYn: 'N' },
    });

    if (!journal) {
      throw new HttpException(
        '존재하지 않는 멘토링 일지 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    return journal;
  }
  
  //* 슈퍼바이저가 자신의 소속 컨설턴트들의 컨설팅 일지 조회
  async consultingListForSupervisor(dto:MentoringApp): Promise<{ data: MentoringApp[]; }> {
    
    const consultingList = await this.userRepository.query(
      `
      SELECT ROW_NUMBER() OVER (ORDER BY ma.createAt DESC) AS rowNo
           , ma.id AS appId
           , ma.userId AS menteeId
           , mentee.email AS menteeMail
           , mentee.name AS menteeName
           , ma.title AS appTitle
           , bm.title AS bmTitle
           , mento.id AS mentoId
           , mento.email AS mentoMail
           , mento.name AS mentoName
           , ct.tagNames
           , cj.consultingCnt
           , CASE WHEN ma.mentoEmail IN (NULL, '') THEN '매칭중'
                  WHEN ma.status IN ('complete') THEN '완료'
                  ELSE '진행중' END AS status
      FROM MentoringApp AS ma LEFT JOIN User mentee ON ma.userId = mentee.id 
           LEFT JOIN User mento ON ma.mentoEmail = mento.email 
           LEFT JOIN BuildUpBmds bm ON ma.buildId = bm.id 
           LEFT JOIN (
                  SELECT appId 
                       , COUNT(*) AS consultingCnt
                  FROM ConsultingJournal cj
                  WHERE 1 = 1
                  GROUP BY appId      
           ) cj ON ma.id = cj.appId LEFT JOIN (
                  SELECT appId
                       , GROUP_CONCAT(ct.tagName, ', ') AS tagNames 
                  FROM ChoiceTags ct 
                  GROUP BY appId      
           ) ct ON ma.id = ct.appId
      WHERE 1 = 1
            AND ma.userId IN (
                  SELECT id 
                  FROM User u 
                  WHERE 1 = 1
                        AND u.role IN ('buildup', 'student', 's-consultant')
                        AND u.affiliationGroup IN (
                                 SELECT affiliationGroup -- 슈퍼바이저코드
                                 FROM User u
                                 WHERE 1 = 1
                                       AND id = ? 
                        )
            )
      `,
      [dto.userId]
    );
    
    return consultingList;
  }

  //* 슈퍼바이저가 자신의 소속 컨설턴트들의 컨설팅 일지 조회
  async getConsultingJournalBySupervisor(
    supervisorId: number,
    currentPage: number,
    pageSize: number,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {
    const skip = (currentPage - 1) * pageSize;
    const supervisor = await this.userRepository.findOne({
      where: { id: supervisorId },
    });
    checkUserRoles(supervisor, ['s-supervisor', 'g-supervisor']);

    const userIdList = await this.userRepository.find({
      where: { affiliationGroup: supervisor.affiliationGroup },
      select: ['id'],
    });

    const bmdsList = await this.buildRepository.find({
      where: { userId: In(userIdList.map((item) => item.id)) },
    });

    const [data, count] = await this.journalRepository.findAndCount({
      where: {
        deletedYn: 'N',
        buildId: In(bmdsList.map((item) => item.id)),
      },
      skip: skip,
      take: pageSize,
    });

    return { data, count };
  }

  // * 컨설팅 일지 단일 조회
  async getConsultingJournalDetail(
    journalId: number,
  ): Promise<ConsultingJournal> {
    const journal = await this.journalRepository.findOne({
      where: { id: journalId },
    });

    if (!journal) {
      throw new HttpException(
        '존재하지 않는 컨설팅 일지 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    return journal;
  }

  //* 일반 유저가 매칭된 컨설턴트에게 후기 작성
  async createReview(
    dto: ReviewDto
  ): Promise<void> {
    
    await this.dataSource.query(
      `INSERT INTO matchReview (
          appId
        , score1
        , score2
        , score3
        , score4
        , score5
        , reviewText
        
      ) VALUES (
          ?
        , ?
        , ?
        , ?
        , ?
        , ?
        , ?
      )`,
      [
        dto.appId,
        dto.score1,
        dto.score2,
        dto.score3,
        dto.score4,
        dto.score5,
        dto.reviewText,
      ],
    );
  }

  // * 컨설턴트를 제외한 유저들이 컨설턴트 후기 조회
  async getReview(
    currentUserId: number,
    consultantId: number,
    currentPage: number,
    pageSize: number,
  ): Promise<
    {
      id: number;
      userId: number;
      createdAt: string;
      score1: number;
      score2: number;
      score3: number;
      score4: number;
      score5: number;
      reviewUserName: string;
    }[]
  > {
    const cUser = await this.userRepository.findOne({
      where: { id: currentUserId },
    });
    if (!cUser) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (cUser.role === 'consultant') {
      throw new HttpException(
        '컨설턴트는 후기를 조회할 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepository.findOne({
      where: { id: consultantId },
    });
    if (!user) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const offset = (currentPage - 1) * pageSize;

    const review = await this.dataSource.query(
      `SELECT id, userId, consultantId, createdAt, score1, score2, score3, score4, score5,  reviewUserName FROM matchReview WHERE consultantId = ? LIMIT ? OFFSET ?`,
      [consultantId, pageSize, offset],
    );

    return review;
  }

  // *슈퍼바이저가 자신의 소속 매칭 정보 단일 조회
  async getMatchDetailBySupervisor(
    supervisorId: number,
    matchId: number,
  ): Promise<{
    data: {
      match: Match;
      review: any[];
      reviewCount: number;
      journalCount: number;
    };
  }> {
    const supervisor = await this.userRepository.findOne({
      where: { id: supervisorId },
    });
    checkUserRoles(supervisor, ['s-supervisor', 'g-supervisor']);

    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: [
        'consultantUser',
        'consultantUser.consutJournals',
        'generalUser',
      ],
    });

    if (!match) {
      throw new HttpException(
        '존재하지 않는 매칭 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const review = await this.dataSource.query(
      `SELECT id, userId, createdAt, score1, score2, score3, score4, score5 FROM matchReview WHERE matchId = ?`,
      [matchId],
    );

    const reviewCount = review.length;
    const journalCount = match.consultantUser.consutJournals.length;

    return {
      data: {
        match, // 매칭 정보
        review, // 리뷰 정보
        reviewCount, // 리뷰 개수
        journalCount, // 저널(일지) 개수
      },
    };
  }

  // *컨설턴트가 특정 유저에게 작성한 일지 리스트 조회
  async getConsultantJournalList(
    consultantId: number,
    generalUserId: number,
    currentPage: number,
    pageSize: number,
  ): Promise<{ data: ConsultingJournal[]; count: number }> {
    const skip = (currentPage - 1) * pageSize;

    const [data, count] = await this.journalRepository.findAndCount({
      where: { consultantUserId: consultantId, generalUserId: generalUserId },
      skip: skip,
      take: pageSize,
    });

    return { data, count };
  }
  // *컨설턴트가 특정 유저에게 작성한 일지 리스트 조회
  async getConsultGeneralInfo(matchId: number): Promise<Match> {
    const matchInfo = this.matchRepository
      .createQueryBuilder('match')
      .leftJoinAndSelect('match.consultantUser', 'consultantUser')
      .leftJoinAndSelect('match.generalUser', 'generalUser')
      .leftJoinAndSelect('match.build', 'build')
      .select([
        'match', // select all fields from match
        'consultantUser.name',
        'consultantUser.company',
        'generalUser.name',
        'generalUser.company',
        'build', // select all fields from build
      ])
      .where('match.id = :matchId', {
        matchId,
      })
      .getOne();

    return matchInfo;
  }

  //* BMDS 매뉴얼 업로드 후 다운로드
  async createManual(id: number, file: Express.Multer.File): Promise<Video> {
    try {
      console.log('filessss', file);
      const videoFile = await this.videoRepository.create({ id });
      if (file) {
        const txtFile = await S3Upload(file);
        videoFile.file_path = txtFile.downloadUrl;
        videoFile.title = txtFile.filename;
      }

      return await this.videoRepository.save(videoFile);
    } catch (error) {
      console.error('Error in createManual:', error);
      throw error;
    }
  }

  // *매뉴얼 갯
  async getManual(id: number): Promise<Video> {
    const manual = await this.videoRepository.findOne({
      where: { id },
    });

    if (!manual) {
      throw new HttpException(
        '존재하지 않는 파일입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    return manual;
  }
}
