import S3 from "aws-sdk/clients/s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFile = (path: any, _name: any) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: _name,
    Body: path,
  };

  return s3.upload(params).promise();
};

export default uploadFile;
