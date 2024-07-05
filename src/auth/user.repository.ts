/*eslint-disable */
import { Auth, DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginHistory } from './history.entity';
import { MailerService } from './mailer.service';
import { CreateAdminDto } from './../admin/dto/createAdmin.dto';
import { UserUpdateDto } from 'src/admin/dto/userUpdate.dto';
import { createReadStream } from 'fs';
import { UserInsertAdminDto } from 'src/admin/dto/userInsertAdmin.dto';
import { BuildUpBmds } from 'src/buildup/entities/buildUpBmds.entity';
import { Portone } from '../portone/portone.entity';
// import { PortoneDto } from '../dto/portone.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private dataSource: DataSource,
    private mailerservice: MailerService,
    @InjectRepository(Portone)
    private portoneRepository: Repository<Portone>,
  ) {
    super(User, dataSource.manager);
    //super : 부모 클래스의 생성자를호출
  }

  // Todo:====================관리자 로그인 및 생성==============================
  // 관리자 생성
  async createAdmin(CreateAdminDto: CreateAdminDto): Promise<User> {
    const { email, password, role } = CreateAdminDto;

    const found = await this.findOneBy({ email });

    if (found) {
      throw new BadRequestException(`Email '${email}' is already taken.`);
    } else {
      // 비밀번호 암호화
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.create({
        email,
        password: hashedPassword,
        role,
      });

      try {
        await this.save(user);
        return await this.findOneBy({ email });
      } catch (e) {
        if (e.errno === 1062) {
          throw new ConflictException('Existing username');
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  }

  // Todo:=====================================================================

  // async confirmEmail(email: string, code: string): Promise<{ status: string }> {
  //   const user = await this.findOneBy({ email });

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   if (user.confirmationCode !== code) {
  //     throw new BadRequestException('Invalid confirmation code');
  //   }

  //   user.isEmailConfirmed = 1;

  //   await this.save(user);
  //   return { status: 'success' };
  // }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { name, email, phoneNum, company, password, /* gender, */ isMentor, affiliationGroup } = authCredentialsDto;

    const found = await this.findOneBy({ email });

    if (found) {
      throw new BadRequestException(`Email '${email}' is already taken.`);
    } else {
      // 비밀번호 암호화
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      // // todo: 메일 인증 로직 추가
      // const confirmationCode = Math.floor(Math.random() * 1000000)
      //   .toString()
      //   .padStart(6, '0');

      // 학생이메일인지 아닌지
      const isInclude = email.includes('.ac.kr');
      if (isInclude) {
        const user = this.create({
          name,
          email,
          phoneNum,
          company,
          password: hashedPassword,
          // gender,
          isMentor,
          // confirmationCode,
          isStudent: 'Y',
        });
        try {
          await this.save(user);
          // await this.mailerservice.sendMail(user.email, user.confirmationCode);
          return await this.findOneBy({ email });
        } catch (e) {
          if (e.errno === 1062) {
            throw new ConflictException('Existing username');
          } else {
            throw new InternalServerErrorException();
          }
        }
      } else {
        const user = this.create({
          name,
          email,
          phoneNum,
          company,
          password: hashedPassword,
          // gender,
          isMentor,
          affiliationGroup,
          // confirmationCode,
          isStudent: 'N',
          role: 'buildup',
        });

        try {
          await this.save(user);

          // Portone 테이블에 사용자 추가
          const portoneUser = this.portoneRepository.create({
            userId: user.id, // 로그인된 사용자의 ID를 연결
            merchantUid: 'mid_71231ceb-aba5-4fb7-b13f-ab21561636b4',
            productName: 'buildup',
            productPrice: 300,
            subscribeMonthNum: 1,
            bmCreationNum: 5,
            buyerName: '빌드업',
            buyerTel: phoneNum,
            buyerEmail: email,
            status: 'paid',
            expireAt: '9999-12-31 00:00:00',
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
            deleteYn: 'N',
          });
          await this.portoneRepository.save(portoneUser);

          // await this.mailerservice.sendMail(user.email, user.confirmationCode);
          return await this.findOneBy({ email });
        } catch (e) {
          if (e.errno === 1062) {
            throw new ConflictException('Existing username');
          } else {
            throw new InternalServerErrorException();
          }
        }
      }
    }
  }

  async saveLoginHistory(user: User, loginDevice: string): Promise<void> {
    const loginHistory = new LoginHistory();

    loginHistory.user = user;
    loginHistory.userId = user.id;
    loginHistory.login_date = new Date();
    loginHistory.login_device = loginDevice;

    try {
      await this.manager.save(loginHistory);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save login history');
    }
  }
  //TODO:==================================================
  async findEmail(name: string, phoneNum: string): Promise<string> {
    const userEmail = await this.createQueryBuilder()
      .where('name = :name', { name: name }) // 조건 추가
      .andWhere('phone_num = :phone_num', { phone_num: phoneNum }) // 추가 조건
      .getOne();

    if (!userEmail) {
      throw new Error('해당 유저를 찾을 수 없습니다.');
    }

    return userEmail.email;
  }

  async findPassword(
    name: string,
    email: string,
    phoneNum: string,
  ): Promise<string> {
    const userPassword = await this.createQueryBuilder()
      .where('name = :name', { name: name }) // 조건 추가
      .where('email = :email', { email: email }) // 조건 추가
      .andWhere('phone_num = :phone_num', { phone_num: phoneNum }) // 추가 조건
      .getOne();

    if (!userPassword) {
      throw new Error('해당 유저를 찾을 수 없습니다.');
    }

    // 임의의 비밀번호를 생성한다.
    const newPassword = Math.random().toString(36).substring(2, 10);

    // 비밀번호를 암호화한다.
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 암호화된 비밀번호를 유저 정보에 업데이트한다.
    userPassword.password = hashedPassword;
    await this.save(userPassword);

    // 비밀번호를 이메일로 전송한다.
    // Todo : 이 부분은 nodemailer, sendgrid 등의 이메일 전송 라이브러리를 이용하여 구현할 수 있습니다.
    await this.mailerservice.sendEmail(userPassword.email, newPassword);

    return newPassword;
  }
  //TODO:==================================================
  async getAll(): Promise<User[]> {
    return await this.find({ where: { deleteYn: 'N' } });
  }

  async getById(id: number): Promise<User> {
    const found = await this.findOneBy({
      id,
    });
    const found1 = await this.createQueryBuilder('User')
      .select([
        'User.id',
        'User.name',
        'User.email',
        'User.gradeId',
        'User.gradelv',
        'User.isEmailConfirmed',
        'User.resume',
        'User.role',
        'User.createdAt',
        // 'User.gender',
        'User.company',
        'User.phoneNum',
        'User.resumeConfirm',
        'User.useCoupon',
        'User.address',
      ])
      .where('User.id=:id', { id })
      .getOne();

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found1;
  }

  async updateById(
    id: number,
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const found = await this.findOneBy({
      id,
    });
    console.log('found', found);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    if (authCredentialsDto.password) {
      // 비밀번호 암호화
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        authCredentialsDto.password,
        salt,
      );
      found.password = hashedPassword;
    }

    found.name = authCredentialsDto.name;
    found.email = authCredentialsDto.email;
    found.company = authCredentialsDto.company;
    // found.gender = authCredentialsDto.gender;
    found.phoneNum = authCredentialsDto.phoneNum;

    await this.save(found);
    return found;
  }

  // admin에서 유저 수정
  async adminUpdateById(
    id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    const found = await this.findOneBy({
      id,
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    if (userUpdateDto.password) {
      // 비밀번호 암호화
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(userUpdateDto.password, salt);
      found.password = hashedPassword;
    }

    found.name = userUpdateDto.name;
    found.email = userUpdateDto.email;
    found.phoneNum = userUpdateDto.phoneNum;
    found.company = userUpdateDto.company;
    // found.gender = userUpdateDto.gender;
    found.role = userUpdateDto.role;
    found.gradeId = userUpdateDto.gradeId;
    found.gradePoint = userUpdateDto.gradePoint;
    found.status = userUpdateDto.status;

    await this.save(found);
    return found;
  }
  // admin에서 유저 생성
  async userInsert(userInsertAdminDto: UserInsertAdminDto): Promise<User> {
    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userInsertAdminDto.password, salt);
    const userInfoAdmin = new User();
    userInfoAdmin.password = hashedPassword;
    userInfoAdmin.name = userInsertAdminDto.name;
    userInfoAdmin.email = userInsertAdminDto.email;
    userInfoAdmin.phoneNum = userInsertAdminDto.phoneNum;
    userInfoAdmin.company = userInsertAdminDto.company;
    userInfoAdmin.address = userInsertAdminDto.address;
    // userInfoAdmin.gender = userInsertAdminDto.gender;
    userInfoAdmin.isEmailConfirmed = 1;
    return await this.save(userInfoAdmin);
  }

  async deleteById(id: number): Promise<User> {
    const found = await this.findOneBy({
      id,
    });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    found.deleteYn = 'Y';

    await this.save(found);
    return found;
  }

  // 이력서 업로드
  async uploadResume(id: number, file: string): Promise<User> {
    const user = await this.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }

    user.resume = file;
    user.resumeConfirm = 1; // 이력서 확인 전에는 1, 확인 후 컨설턴트가 되면 2, 이력서 업로드 안하면 0임

    try {
      await this.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to upload resume');
    }
    return user;
  }

  async downloadResume(id: number, res): Promise<any> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Can't find User with id ${id}`);
    }

    if (!user.resume) {
      throw new NotFoundException(`No resume found for User with id ${id}`);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=resume.pdf`);

    // 파일 데이터를 스트림으로 전송
    const fileStream = createReadStream(user.resume);
    return fileStream.pipe(res);
    //return res.send(user.resume);
  }
}
