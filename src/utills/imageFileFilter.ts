import { HttpException, HttpStatus } from '@nestjs/common';

export function imageFileFilter(req, file, callback) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        '오직 이미지 파일만 업로드 가능합니다.',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
}
