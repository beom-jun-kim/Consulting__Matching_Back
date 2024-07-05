/*eslint-disable*/
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { QnaService } from '../service/qna.service';
import { CreateQnaDto } from '../dto/create-qna.dto';
import { Qna } from '../qna.entity';
import { ApiOperation } from '@nestjs/swagger';
import { User } from 'src/auth/user.entity';
@Controller('api/qna')
export class QnaController {
  constructor(private qnaService: QnaService) {}

  // 게시글 생성
  @ApiOperation({ summary: 'QnA 게시글 생성' })
  @Post('/:id')
  @UsePipes(ValidationPipe)
  async createQna(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQnaDto: CreateQnaDto,
  ): Promise<Qna> {
    return await this.qnaService.createQna(id, createQnaDto);
  }

  // 게시글 상세보기
  @ApiOperation({ summary: 'QnA 게시글 개별 조회' })
  @Get('/:id')
  @UsePipes(ValidationPipe)
  getQnaId(@Param('id') userId: number): Promise<Qna> {
    return this.qnaService.getQnaId(userId);
  }

  // 마이페이지에 내 정보와 내가 쓴 qna글 조인해서 가져오기
  @ApiOperation({ summary: '내 정보 및 QnA 게시글 조회' })
  @Get('/getJoin/:id')
  @UsePipes(ValidationPipe)
  getUsrJoin(@Param('id') userId: User): Promise<Qna[]> {
    return this.qnaService.getUsrJoin(userId);
  }

  // 게시글 조회
  @ApiOperation({ summary: 'QnA 게시글 전체 조회' })
  @Get()
  getAllQna(): Promise<Qna[]> {
    return this.qnaService.getAllQna();
  }

  // 답변
  @ApiOperation({ summary: 'QnA 게시글 답변' })
  @Patch('/:id/comment')
  @UsePipes(ValidationPipe)
  createComment(
    @Body()
    answerObject: {
      answer: string;
    },
    @Param('id') id: number,
  ): Promise<Qna> {
    return this.qnaService.createComment(answerObject, id);
  }

  // 게시글 수정
  @ApiOperation({ summary: 'QnA 게시글 수정' })
  @Patch('/:id/update')
  @UsePipes(ValidationPipe)
  updateQna(
    @Body() createQnaDto: CreateQnaDto,
    @Param('id') id: number,
  ): Promise<Qna> {
    return this.qnaService.updateQna(createQnaDto, id);
  }

  // 게시글 삭제
  @ApiOperation({ summary: 'QnA 게시글 삭제' })
  @Patch('/:id/delete')
  @UsePipes(ValidationPipe)
  deleteQna(@Param('id') id: number): Promise<Qna> {
    return this.qnaService.deleteQna(id);
  }

  // 게시글 파일 다운로드
  // @ApiOperation({ summary: 'QnA 게시글 다운로드' })
  // @Get('/download/:filename')
  // async downloadS3File(
  //   @Param('filename') filename: string,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   try {
  //     const fileBuffer = await this.qnaService.downloadFile(filename);

  //     // Sanitize the filename for security
  //     const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, '');

  //     res.setHeader(
  //       'Content-Disposition',
  //       `attachment; filename=${sanitizedFilename}`,
  //     );
  //     res.setHeader('Content-Type', 'application/octet-stream');
  //     res.setHeader('Content-Length', fileBuffer.length);

  //     res.send(fileBuffer);
  //   } catch (error) {
  //     console.error('Error serving file:', error);
  //     res.status(500).send('Internal Server Error');
  //   }
  // }
}
