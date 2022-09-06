import fs from "fs";
import S3 from "aws-sdk/clients/s3";
import aws from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION_BLACKOUT;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID_BLACKOUT;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_BLACKOUT;

aws.config.update({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
  bucketName,
});

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: uuidv4(),
  };

  return s3.upload(uploadParams).promise();
}

export default uploadFile;
