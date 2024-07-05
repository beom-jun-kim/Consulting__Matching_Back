/*eslint-disable*/
import { Injectable, NestMiddleware } from '@nestjs/common';
import multer from 'multer';
import path from 'path';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private readonly upload;

  constructor() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
        cb(
          null,
          new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname,
        );
      },
    });
    this.upload = multer({ storage: storage }).single('nopath');
  }

  use(req: any, res: any, next: () => void) {
    this.upload(req, res, (err) => {
      if (err) {
        throw new Error(err.message);
      }
      next();
    });
  }
}
