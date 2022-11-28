import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: "AKIA6ELI2U66J4VETQWY",
  secretAccessKey: "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",
  region: "us-east-1",
});

const uploadFile = (path: any, _name: any) => {
  const params = {
    Bucket: "uhaus/public/uploads/images",
    Key: _name,
    Body: path,
  };

  return s3.upload(params).promise();
};

export default uploadFile;
