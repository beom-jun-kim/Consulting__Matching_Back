import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MentoringAppDto } from '../dtos/mentoringApp.dto';
import { MentoringApp } from '../entities/mentoringapp.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

@Injectable()
export class MentoringAppService {
  constructor(private readonly dataSource: DataSource) {}

  // 멘티가 멘토링 신청서 작성
  async createApplication(dto: MentoringAppDto): Promise<void> {
    console.log(dto);
    const user = await this.dataSource.query(
      `SELECT * FROM User u WHERE u.id = ?`,
      [dto.userId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    // 셀프멘토링이면
    if (dto.isSelf == 1) {
      const mentoringapp = await this.dataSource.query(
        `INSERT INTO MentoringApp (
            userId 
            , buildId
            , title
            , isSelf
            , mentoEmail
            , mentoringAt
            , createAt
        )
        VALUES (?,?,?,?,?,?,?)
        `,
        [
          dto.userId,
          dto.buildId,
          dto.title,
          dto.isSelf,
          user[0].email,
          dto.mentoringAt,
          new Date(),
        ],
      );
      const appId = mentoringapp.insertId;

      if (dto.tagName) {
        for (const tag of dto.tagName) {
          await this.dataSource.query(
            `INSERT INTO ChoiceTags (
                appId
                , userId
                , tagName
            )
            VALUES (?,?,?)
            `,
            [appId, dto.userId, tag],
          );
        }
      }
      await this.dataSource.query(
        `INSERT INTO Matching (
            appId
            , menteeId
            , mentoId
            , acceptance
            , createAt
        )
        VALUES (?,?,?,?,?)
        `,
        [appId, dto.userId, dto.userId, 'Y', new Date()],
      );
    }
    // 셀프멘토링이 아니면서 멘토를 지정했을 때
    else if (dto.isSelf == 0 && dto.mentoEmail) {
      const mento = await this.dataSource.query(
        `SELECT * FROM User u WHERE u.email = ?`,
        [dto.mentoEmail],
      );
      if (mento.length == 0) {
        throw new HttpException(
          '존재하지 않는 멘토 정보입니다.',
          HttpStatus.NOT_FOUND,
        );
      }
      const mentoringapp = await this.dataSource.query(
        `INSERT INTO MentoringApp (
            userId
            , buildId
            , title
            , mentoEmail
            , place
            , mentoringAt
            , createAt
        )
        VALUES (?,?,?,?,?,?,?)
        `,
        [
          dto.userId,
          dto.buildId,
          dto.title,
          dto.mentoEmail,
          dto.place,
          dto.mentoringAt,
          new Date(),
        ],
      );
      const appId = mentoringapp.insertId;

      if (dto.tagName) {
        for (const tag of dto.tagName) {
          await this.dataSource.query(
            `INSERT INTO ChoiceTags (
                appId
                , userId
                , tagName
            ) 
            VALUES (?,?,?)
            `,
            [appId, dto.userId, tag],
          );
        }
      }
      await this.dataSource.query(
        `INSERT INTO Matching (
            appId
            , menteeId
            , mentoId
            , acceptance
            , createAt
        ) 
        VALUES (?,?,?,?,?)
        `,
        [appId, dto.userId, mento[0].id, 'N', new Date()],
      );
    }
    // 셀프멘토링이 아니면서 멘토를 지정하지 않았을 때
    else if (dto.isSelf == 0 && !dto.mentoEmail) {
      const mentoringapp = await this.dataSource.query(
        `INSERT INTO MentoringApp (
            userId
            , buildId
            , title
            , mentoEmail
            , place
            , status
            , mentoringAt
            , createAt
        )
        VALUES (?,?,?,?,?,?,?,?)
        `,
        [
          dto.userId,
          dto.buildId,
          dto.title,
          '',
          dto.place,
          'request',
          dto.mentoringAt,
          new Date(),
        ],
      );
      const appId = mentoringapp.insertId;

      if (dto.tagName) {
        for (const tag of dto.tagName) {
          await this.dataSource.query(
            `INSERT INTO ChoiceTags (
                appId
                , userId
                , tagName
            ) 
            VALUES (?,?,?)
            `,
            [appId, dto.userId, tag],
          );
        }
      }
      await this.dataSource.query(
        `INSERT INTO Matching (
            appId
            , menteeId
            , mentoId
            , acceptance
            , createAt
        )
        SELECT ct.appId
             , ct.userId AS menteeId
             , tl.userId AS mentoId
             , 'N'
             , ?
        FROM TagList tl 
        INNER JOIN ChoiceTags ct ON tl.tagName = ct.tagName 
        WHERE 1 = 1
              AND ct.userId = ? 
              AND ct.appId = ?
        GROUP BY ct.appId, ct.userId , tl.userId
        `,
        [new Date(), dto.userId, appId],
      );
    }
  }

  /// 멘티가 보는 멘토링 신청내역
  async appList(dto: MentoringAppDto): Promise<void> {
    const user = await this.dataSource.query(
      `SELECT * FROM User u WHERE u.id = ?`,
      [dto.userId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const applicationList = await this.dataSource.query(
      `SELECT @rownum:=@rownum+1 AS rowNo
            , ma.id
            , ma.userId 
            , ma.buildId 
            , ma.title
            , ma.mentoringAt
            , DATE_FORMAT(ma.mentoringAt, '%Y.%m.%d %H:%i:%s') AS mentoringAtFormat
            , ma.place
            , CASE
                   WHEN ma.status = 'complete' THEN 'complete'
                   WHEN ma.mentoEmail in (null, '') THEN 'accept'
                   WHEN ma.mentoEmail is not null and ma.mentoEmail != '' THEN 'mentoring'
                   ELSE '-' END AS matchState
            , CT.tagName
            , IFNULL(cj.journalCnt, 0) AS journalCnt
        FROM MentoringApp ma 
        LEFT JOIN (SELECT appId , COUNT(*) AS journalCnt FROM ConsultingJournal cj WHERE 1 = 1 GROUP BY appId) cj ON ma.id = cj.appId
        LEFT JOIN (SELECT appId , GROUP_CONCAT(tagName SEPARATOR ', ') AS tagName FROM ChoiceTags ct GROUP BY appId ) CT ON ma.id = CT.appId 
        LEFT JOIN (SELECT appId , sum(CASE WHEN acceptance = 'Y' THEN 1 ELSE 0 END) AS accept_state FROM Matching m WHERE 1 = 1 GROUP BY appId ) A ON ma.id = A.appId, (SELECT @rownum:=0) B WHERE 1 = 1 AND ma.userId = ? ORDER BY createAt DESC
        `,
      [dto.userId],
    );

    return applicationList;
  }

  // 멘티가 멘토링 신청서 수정
  async updateApplication(dto: MentoringAppDto): Promise<void> {
    const app = await this.dataSource.query(
      `SELECT * FROM MentoringApp ma WHERE ma.id = ?`,
      [dto.appId],
    );
    if (app.length == 0) {
      throw new HttpException(
        '존재하지 않는 신청서 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const mentoringapp = await this.dataSource.query(
      `UPDATE MentoringApp  SET
        buildId = ?
        , title = ?
        , isSelf = ? 
        , mentoEmail = ? 
        , place = ?
        , mentoringAt = ?
        , updateAt = ?
        WHERE 1 = 1
              AND id = ?
      `,
      [
        dto.buildId,
        dto.title,
        dto.isSelf,
        dto.mentoEmail,
        dto.place,
        dto.mentoringAt,
        new Date(),
        dto.appId,
      ],
    );

    console.log(dto.tagName);
    if (dto.tagName) {
      console.log('1');
      await this.dataSource.query(
        `DELETE
         FROM ChoiceTags
         WHERE 1 = 1
               AND appId = ?
        `,
        [dto.appId],
      );

      for (const tag of dto.tagName) {
        await this.dataSource.query(
          `INSERT INTO ChoiceTags (
                appId 
              , userId 
              , tagName 
        ) VALUES (
                ?
              , ?
              , ?
        )`,
          [dto.appId, dto.userId, tag],
        );
      }
    }
    await this.dataSource.query(
      `DELETE FROM Matching 
       WHERE 1 = 1
             AND appId = ?
        `,
      [dto.appId],
    );

    const appId = mentoringapp.insertId;
    // 멘토를 지정할때
    if (dto.mentoEmail) {
      const mento = await this.dataSource.query(
        `SELECT * FROM User u WHERE u.email = ?`,
        [dto.mentoEmail],
      );
      if (mento.length == 0) {
        throw new HttpException(
          '존재하지 않는 유저 정보입니다.',
          HttpStatus.NOT_FOUND,
        );
      }
      // await this.dataSource.query(
      //   `INSERT INTO Matching (
      //       appId
      //       , menteeId
      //       , mentoId
      //       , acceptance
      //       , createAt
      //   )
      //   VALUES (?,?,?,?,?)
      //   `,
      //   [appId, dto.userId, mento[0].id, 'N', new Date()],
      // );
      await this.dataSource.query(
        `UPDATE Matching SET mentoId = ? WHERE appId = ?`,
        [mento[0].id, dto.appId],
      );
    } else {
      // await this.dataSource.query(
      //   `INSERT INTO Matching (
      //       appId
      //       , menteeId
      //       , mentoId
      //       , acceptance
      //       , createAt
      //   )
      //   SELECT ct.appId
      //        , ct.userId AS menteeId
      //        , tl.userId AS mentoId
      //        , 'N'
      //        , ?
      //   FROM TagList tl
      //   INNER JOIN ChoiceTags ct ON tl.tagName = ct.tagName
      //   WHERE 1 = 1
      //         AND ct.userId = ?
      //         AND ct.appId = ?
      //   GROUP BY ct.appId, ct.userId , tl.userId
      //   `,
      //   [new Date(), dto.userId, dto.appId],
      // );
    }
  }

  // 멘토들이 보는 신청서 리스트
  async getApplication(
    dto: MentoringAppDto,
  ): Promise<{ data: MentoringApp[]; count: number }> {
    const user = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ?`,
      [dto.mentoId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const offset = (dto.pageNum - 1) * dto.pageSize;

    const count = await this.dataSource.query(
      `SELECT COUNT(DISTINCT ma.id) AS count
       FROM MentoringApp ma 
       LEFT JOIN ChoiceTags ct ON ma.id = ct.appId
       LEFT JOIN User u ON ma.userId = u.id
       LEFT JOIN ( SELECT appId, sum(CASE WHEN acceptance = 'Y' THEN 1 ELSE 0 END) AS accept_state
       FROM Matching m 
       WHERE 1 = 1
       GROUP BY appId ) A ON ma.id = A.appId
       WHERE 1 = 1
       AND accept_state = 0
       AND ma.mentoEmail = ?
       AND ma.isSelf = 0;
       AND ma.status !== 'mentoring'
        `,
      [user[0].email],
    );
    const mentoringAppList = await this.dataSource.query(
      `SELECT ROW_NUMBER() OVER (ORDER BY ma.id) AS rowNo
            , ma.id
            , ma.userId
            , u.name AS menteeName
            , ma.title
            , ma.mentoringAt
            , DATE_FORMAT(ma.mentoringAt, '%Y.%m.%d %H:%i') AS mentoringAtFormat
            , ma.place
            , m.acceptance
            , GROUP_CONCAT(ct.tagName) AS tagNames
            , ma.status
        FROM MentoringApp ma
        JOIN Matching m ON m.appId = ma.id
        LEFT JOIN ChoiceTags ct ON ma.id = ct.appId
        LEFT JOIN User u ON ma.userId = u.id
        WHERE 1 = 1
              AND m.mentoId = ?
              AND ma.isSelf = 0
        GROUP BY ma.id, ma.userId, ma.title, ma.mentoringAt, ma.place, m.acceptance
        LIMIT ?, ?;
      `,
      [dto.mentoId, offset, dto.pageSize],
    );
    return { data: mentoringAppList, count: Number(count[0].count) };
  }

  // 멘토정보 조회
  async loadMentoInfo(
    dto: MentoringAppDto,
  ): Promise<{ AuthCredentialsDto: any }> {
    const user = await this.dataSource.query(
      `
      SELECT u.*
      FROM MentoringApp ma LEFT JOIN User u ON ma.mentoEmail = u.email 
      WHERE 1 = 1
            AND ma.id = ?
      `,
      [dto.appId],
    );

    console.log(user);

    return user;
  }

  // 멘티 정보 조회
  async loadMenteeInfo(
    dto: MentoringAppDto,
  ): Promise<{ AuthCredentialsDto: any }> {
    const user = await this.dataSource.query(
      `
      SELECT u.*
      FROM MentoringApp ma LEFT JOIN User u ON ma.userId = u.id  
      WHERE 1 = 1
            AND ma.id = ?
      `,
      [dto.appId],
    );

    console.log(user);

    return user;
  }

  // 신청서
  async application(dto: MentoringAppDto): Promise<void> {
    const application = await this.dataSource.query(
      `SELECT ma.*
            , A.*
            , bub.title as bmTitle
       FROM MentoringApp ma LEFT JOIN (
              SELECT appId
                   , GROUP_CONCAT(tagName SEPARATOR ', ') AS tagName
              FROM ChoiceTags ct
              GROUP BY appId
            ) A on ma.id = A.appId LEFT JOIN BuildUpBmds bub ON ma.buildId = bub.id
       WHERE 1 = 1
             AND ma.id = ?`,
      [dto.appId],
    );
    return application;
  }
  // 멘토들이 신청서를 보고 멘토링 신청
  async putApplication(dto: MentoringAppDto): Promise<void> {
    const user = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ?`,
      [dto.mentoId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.dataSource.query(
      `UPDATE Matching SET acceptance = 'Y', updateAt = NOW()
         WHERE 1 = 1
               AND appId = ? 
               AND mentoId = ?
        `,
      [dto.appId, dto.mentoId],
    );
  }
  // 멘토들이 멘토링 신청취소
  async putApplicationCancel(dto: MentoringAppDto): Promise<void> {
    const user = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ?`,
      [dto.mentoId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.dataSource.query(
      `UPDATE Matching SET acceptance = 'N', updateAt = NOW()
         WHERE 1 = 1
               AND appId = ? 
               AND mentoId = ?
        `,
      [dto.appId, dto.mentoId],
    );
  }
  // 멘티가 보는 멘토링 신청리스트
  async getAcceptList(dto: MentoringAppDto): Promise<MentoringApp[]> {
    const user = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ?`,
      [dto.userId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const applicationAry = await this.dataSource.query(
      `SELECT ma.id
            , ma.userId
            , ma.title
            , CASE WHEN (accept_state IS NULL OR accept_state = 0) THEN 'request'
                   WHEN ma.status = 'complete' THEN 'complete'
                   WHEN mentoEmail in (null, '') THEN 'accept'
                   WHEN mentoEmail is not null and mentoEmail != '' THEN 'mentoring'
            ELSE '-' END AS matchState
        FROM MentoringApp ma
        LEFT JOIN (
            SELECT appId
                 , sum(CASE WHEN acceptance = 'Y' THEN 1 ELSE 0 END) AS accept_state
            FROM Matching m 
            WHERE 1 = 1
            GROUP BY appId
        ) A ON ma.id = A.appId
        WHERE 1 = 1
              AND ma.userId = ?
              AND ma.mentoEmail = ''
              AND ma.deleteYn = 'N'
        `,
      [dto.userId],
    );

    const matchingAry = await this.dataSource.query(
      `SELECT ma.id
            , ma.userId
            , ma.title
            , m.mentoId
            , m.updateAt
            , DATE_FORMAT(m.updateAt, '%Y.%m.%d %H:%i') AS updateAtFormat
            , u.name AS mentoName
            , CASE WHEN (accept_state IS NULL OR accept_state = 0) THEN 'request'
                   WHEN ma.status = 'complete' THEN 'complete'
                   WHEN mentoEmail in (null, '') THEN 'accept'
                   WHEN mentoEmail is not null and mentoEmail != '' THEN 'mentoring'
                   ELSE '-' END AS matchState
        FROM MentoringApp ma 
        LEFT JOIN Matching m ON ma.id = m.appId
        LEFT JOIN User u ON m.mentoId = u.id
        LEFT JOIN (
            SELECT appId
                 , sum(CASE WHEN acceptance = 'Y' THEN 1 ELSE 0 END) AS accept_state
            FROM Matching m 
            WHERE 1 = 1
            GROUP BY appId
        ) A ON ma.id = A.appId
        WHERE 1 = 1
              AND ma.userId = ?
              AND ma.mentoEmail = ''
              AND m.acceptance = 'Y'
              AND ma.deleteYn = 'N'
       `,
      [dto.userId],
    );
    const applicationList = [];
    for (let i = 0; i < applicationAry.length; i++) {
      const application = applicationAry[i];
      const applicationId = application['id'];
      const matchingList = [];

      for (let j = 0; j < matchingAry.length; j++) {
        const matching = matchingAry[j];
        if (applicationId == matching['id']) {
          matchingList.push({
            id: matching['id'],
            mentoId: matching['mentoId'],
            mentoName: matching['mentoName'],
            matchState: matching['matchState'],
            updateAt: matching['updateAt'],
            updateAtFormat: matching['updateAtFormat'],
          });
        }
      }
      applicationList.push({
        rowNo: i + 1,
        id: application['id'],
        userId: application['userId'],
        title: application['title'],
        matchingList: matchingList,
      });
    }

    console.log(applicationList);

    return applicationList;
  }

  // 멘티가 멘토 정보 확인
  async getMentoInfo(dto: MentoringAppDto): Promise<MentoringApp[]> {
    const mento = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ?`,
      [dto.mentoId],
    );
    if (!mento) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const mentoInfo = await this.dataSource.query(
      `SELECT u.id
            , u.name
            , u.email
            , u.phone_num
            , u.company
            , u.gender
            , mr.avgScore
            , GROUP_CONCAT(tl.tagName) AS tagNames
       FROM User u
       LEFT JOIN TagList tl on u.id = tl.userId
       LEFT JOIN matchReview mr on u.id = mr.mentoId
       WHERE 1 = 1
             AND u.id = ?
       `,
      [dto.mentoId],
    );
    return mentoInfo;
  }

  // 멘티가 맘에 드는 멘토를 수락
  async putAccept(dto: MentoringAppDto): Promise<any> {
    console.log('1');
    const user = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ?`,
      [dto.mentoId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.dataSource.query(
      `UPDATE MentoringApp SET mentoEmail = ?, updateAt = NOW()
       WHERE 1 = 1
             AND id = ?
        `,
      [user[0].email, dto.appId],
    );
    await this.dataSource.query(
      `UPDATE Matching SET deleteYn = 'Y', updateAt = NOW()
       WHERE 1 = 1
             AND appId = ? 
             AND menteeId = ?
             AND mentoId <> ?
      `,
      [dto.appId, dto.userId, dto.mentoId],
    );
  }

  // 멘토가 보는 멘토링 내역 리스트
  async getMentoring(
    dto: MentoringAppDto,
  ): Promise<{ data: MentoringApp[]; count: number }> {
    const user = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ?`,
      [dto.mentoId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const offset = (dto.pageNum - 1) * dto.pageSize;

    const count = await this.dataSource.query(
      `SELECT COUNT(DISTINCT ma.id) AS count
      FROM MentoringApp ma
      LEFT JOIN ChoiceTags ct on ct.appId  = ma.id
      LEFT JOIN (
	        SELECT
		        appId
		        , sum(CASE WHEN acceptance = 'Y' THEN 1 ELSE 0 END) AS accept_state
	        FROM Matching m 
          WHERE 1 = 1
          GROUP BY appId
      ) A ON ma.id = A.appId
      WHERE 1=1
      AND (ma.mentoEmail = ? OR ma.status = 'complete');
        `,
      [user[0].email],
    );

    const mentoringAppList = await this.dataSource.query(
      `SELECT ROW_NUMBER() OVER (ORDER BY ma.id) AS rowNo
          , ma.id
          , ma.userId
          , u.name
          , ma.title
          , ma.place
          , ma.mentoringAt
          , ma.status
          , DATE_FORMAT(ma.mentoringAt, '%Y.%m.%d %H:%i') AS mentoringAtFormat
          , ct.tagNames
          , CASE WHEN (accept_state IS NULL OR accept_state = 0) THEN 'request'
                 WHEN ma.status = 'complete' THEN 'complete'
                 WHEN mentoEmail in (null, '') THEN 'accept'
                 WHEN mentoEmail is not null and mentoEmail != '' THEN 'mentoring'
                 ELSE '-' END AS matchState
          , IFNULL(cj.journalCnt, 0) AS journalCnt
          , ma.buildId 
          , bub.title AS bmTitle
          , (mr.score1 + mr.score2 + mr.score3 + mr.score4 + mr.score5) avgScore
          , mu.email AS menteeEmail
      FROM MentoringApp ma LEFT JOIN BuildUpBmds bub on ma.buildId = bub.id

      LEFT JOIN (SELECT appId, group_concat(ct.tagName) as tagNames FROM  ChoiceTags ct group by appId) ct on ct.appId  = ma.id
      LEFT JOIN (SELECT appId, COUNT(*) AS journalCnt FROM ConsultingJournal cj WHERE 1 = 1 GROUP BY appId) cj ON ma.id = cj.appId
      LEFT JOIN User u ON u.id = ma.userId
      LEFT JOIN (SELECT appId, sum(CASE WHEN acceptance = 'Y' THEN 1 ELSE 0 END) AS accept_state FROM Matching m WHERE 1 = 1 GROUP BY appId) A ON ma.id = A.appId
      LEFT JOIN matchReview mr on mr.appId = ma.id
      LEFT JOIN User mu ON mu.id = ma.userId 

      WHERE 1=1
      AND (ma.mentoEmail = ? OR ma.status = 'complete')
      GROUP BY ma.id
      LIMIT ?,?;
    `,
      [user[0].email, offset, dto.pageSize],
    );
    return { data: mentoringAppList, count: Number(count[0].count) };
  }
  // 멘토가 멘토링을 완료
  async completeMentoring(dto: MentoringAppDto): Promise<any> {
    const matching = await this.dataSource.query(
      `SELECT * FROM Matching WHERE id = ?`,
      [dto.appId],
    );
    if (!matching) {
      throw new HttpException(
        '존재하지 않는 매칭 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.dataSource.query(
      `UPDATE MentoringApp 
       SET status = 'complete'
         , updateAt = NOW()
       WHERE 1 = 1
             AND id = ?
      `,
      [dto.id],
    );
  }
  // 멘티가 멘토에 대한 후기 작성
  async createReview(dto: MentoringAppDto): Promise<any> {
    const user = await this.dataSource.query(
      `SELECT * FROM User WHERE id = ? OR id = ?`,
      [dto.userId, dto.mentoId],
    );
    if (user.length == 0) {
      throw new HttpException(
        '존재하지 않는 유저 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const app = await this.dataSource.query(
      `SELECT * FROM MentoringApp WHERE id = ?`,
      [dto.appId],
    );
    if (app.length == 0 || app[0].status != 'complete') {
      throw new HttpException(
        '멘토링이 완료되지 않았거나 존재하지 않는 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    const avgScore =
      (dto.score1 + dto.score2 + dto.score3 + dto.score4 + dto.score5) / 5;
    await this.dataSource.query(
      `INSERT INTO matchReview (
            appId
            , userId
            , mentoId
            , score1
            , score2
            , score3
            , score4
            , score5
            , avgScore
            , reviewText
            , createAt
        )
        VALUES (?,?,?,?,?,?,?,?,?,?)
        `,
      [
        dto.appId,
        dto.userId,
        dto.mentoId,
        dto.score1,
        dto.score2,
        dto.score3,
        dto.score4,
        dto.score5,
        avgScore,
        dto.reviewText,
        new Date(),
      ],
    );
  }

  // 멘티가 멘토에 대한 후기 내용 조회

  // 프론트에서 보내준 값들의 데이터와 데이터타입 (MentoringAppDto)
  async reviewInfo(dto: MentoringAppDto): Promise<any> {
    // dataSource: 데이터베이스와 연결해준다
    const app = await this.dataSource.query(
      // 이거는 쿼리를 쓴거다
      `SELECT *
      from MentoringApp ma 
      WHERE 1=1
      AND ma.Id = ?`,

      // 이거는 실질적으로 프론트에서 보내온 값을 적어줘야한다
      [dto.appId],
    );

    // 값을 잘 받아왔는지 확인해보기
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log('app', app);

    // 과연 값을 잘 받지 않았을때
    if (app.length == 0 || app[0].status != 'complete') {
      throw new HttpException(
        '멘토링이 완료되지 않았거나 존재하지 않는 정보입니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    const review = await this.dataSource.query(
      `SELECT *
      from matchReview ma
      WHERE 1=1
      AND ma.appId = ?`,
      [dto.appId],
    );

    if (review.length === 0) {
      throw new HttpException('작성된 후기가 없습니다', HttpStatus.NOT_FOUND);
    }
    return review[0];
  }

  async updateReview(dto: MentoringAppDto): Promise<any> {
    const app = await this.dataSource.query(
      `
        SELECT *
        FROM MentoringApp ma
        WHERE 1=1
        AND ma.id =?
      `,
      [dto.appId],
    );

    if (app.length == 0 || app[0].status != 'complete') {
      throw new HttpException(
        '멘토링이 완료되지 않았거나 존재하지 않는 후기입니다',
        HttpStatus.NOT_FOUND,
      );
    }

    const review = await this.dataSource.query(
      `
      UPDATE matchReview mr SET  score1 = ? , score2 = ? , score3 = ? ,score4 = ? ,score5 = ? ,  reviewText = ?
      WHERE 1=1
      AND mr.appId = ?
      `,
      [
        dto.score1,
        dto.score2,
        dto.score3,
        dto.score4,
        dto.score5,
        dto.reviewText,
        dto.appId
      ],
    );
    if (review.length == 0) {
      throw new HttpException('작성된 후기가 없습니다', HttpStatus.NOT_FOUND);
    }
    return review[0];
  }
}
