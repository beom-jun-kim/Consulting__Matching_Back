import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

interface S3UploadResult {
  uploadResult: AWS.S3.ManagedUpload.SendData;
  downloadUrl: string;
  storedPath: string;
  filename: string;
}

export function uploadToS3(
  file: Express.Multer.File,
): Promise<AWS.S3.ManagedUpload.SendData> {
  AWS.config.update({
    accessKeyId: 'AKIASEB4FW67ZAW624GJ',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
  });
  const s3 = new AWS.S3(); // S3 객체 초기화
  // const bucketName = 'https://d214x0c21df4fw.cloudfront.net'; // 사용할 S3 버킷 이름
  const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
  // 파일명 인코딩: 한글 파일명을 안전하게 처리
  const encodedFileName = Math.random().toString().slice(2, 12);
  // encodeURIComponent(file.originalname);

  // S3 업로드 옵션 설정
  const uploadOptions = {
    Bucket: bucketName,
    Key: `${uuidv4()}_${encodedFileName}`,
    Body: file.buffer,
    ACL: 'public-read', // 필요한 권한을 설정합니다.
    ContentType: file.mimetype,
    // ContentDisposition: `attachment; filename="${file.originalname}"`,
  };

  // S3에 파일을 업로드하고 그 결과를 반환합니다.
  return s3.upload(uploadOptions).promise();
}

export async function S3Upload(
  file: Express.Multer.File,
): Promise<S3UploadResult> {
  if (!file || !file.buffer) {
    throw new Error('Invalid or missing file data');
  }
  AWS.config.update({
    accessKeyId: 'AKIASEB4FW67ZAW624GJ',
    secretAccessKey: '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',
    region: 'ap-northeast-2',
  });
  const s3 = new AWS.S3(); // S3 객체 초기화
  const bucketName = 'dev.new.bmds'; // 사용할 S3 버킷 이름
  file.originalname = Buffer.from(file.originalname, 'ascii').toString('utf8');
  const encodedStoredPath = encodeURIComponent(
    `${uuidv4()}_${file.originalname}`,
  );

  const encodedFilename = encodeURIComponent(file.originalname).replace(
    /%20/g,
    '_',
  );

  const uploadOptions = {
    Bucket: bucketName,
    Key: encodedStoredPath,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: 'application/octet-stream',
  };

  const uploadResult = await s3.upload(uploadOptions).promise();

  const downloadOptions = {
    Bucket: bucketName,
    Key: uploadResult.Key,
    Expires: 60 * 60 * 24 * 7,
  };

  const downloadUrl = await s3.getSignedUrlPromise(
    'getObject',
    downloadOptions,
  );

  return {
    uploadResult,
    downloadUrl,
    storedPath: encodedStoredPath,
    filename: encodedFilename,
  };
}
