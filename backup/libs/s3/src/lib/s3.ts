import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {GetObjectCommand, S3} from "@aws-sdk/client-s3";
import {Upload} from "@aws-sdk/lib-storage";
import {FetchHttpHandler} from "@smithy/fetch-http-handler";

const tenant = 'rissasoft'; //must come from the user who is logged in

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
const region = process.env.NEXT_PUBLIC_S3_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY;

const credentials = {
  accessKeyId,
  secretAccessKey
};

const client = new S3({ credentials, region, requestHandler: new FetchHttpHandler({ keepAlive: false }) })

export function uploadFile(key, fileStream) {
  const params = {
    Bucket: bucketName,
    Key: tenant + '/' + key,
    Body: fileStream,
  };

  return new Upload({
    client,
    params,
  });
}

export async function getFileS3Url(key) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  return await getSignedUrl(client, command, {expiresIn: 3600});
}

export function deleteFile(key) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  return client.deleteObject(params);
}

export async function getAllFiles() {
  const params = {
    Bucket: bucketName,
    Prefix: tenant + '/',
    MaxKeys: 10
  };

  return await client.listObjects(params);
}
