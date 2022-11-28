import S3 from "aws-sdk/clients/s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.LET_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.LET_AWS_SECRET_ACCESS_KEY,
  region: process.env.LET_AWS_REGION,
});

const uploadFile = (path: any, _name: any) => {
  const params = {
    Bucket: process.env.LET_AWS_BUCKET_NAME as string,
    Key: _name,
    Body: path,
  };

  return s3.upload(params).promise();
};

export default uploadFile;
