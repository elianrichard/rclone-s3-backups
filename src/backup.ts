import { exec, spawn } from "child_process";
import { env } from "./env.js";
import path from "path";
import os from "os";
import fs from "fs";
import { constructBucketPath } from "./utils.js";

const {
  DESTINATION_S3_ACCESS_KEY_ID,
  DESTINATION_S3_SECRET_ACCESS_KEY,
  DESTINATION_S3_BUCKET,
  DESTINATION_S3_REGION,
  DESTINATION_S3_ENDPOINT,
  DESTINATION_BUCKET_SUBFOLDER,
  DESTINATION_S3_PROVIDER,
  ORIGIN_S3_ACCESS_KEY_ID,
  ORIGIN_S3_SECRET_ACCESS_KEY,
  ORIGIN_S3_BUCKET,
  ORIGIN_S3_REGION,
  ORIGIN_S3_ENDPOINT,
  ORIGIN_BUCKET_SUBFOLDER,
  ORIGIN_S3_PROVIDER,
  ADDITIONAL_RCLONE_FLAGS,
} = env;

function createRcloneConfig(outputPath: string) {
  const rcloneConfig = `
[origin]
type = s3
provider = ${ORIGIN_S3_PROVIDER}
access_key_id = ${ORIGIN_S3_ACCESS_KEY_ID}
secret_access_key = ${ORIGIN_S3_SECRET_ACCESS_KEY}
endpoint = ${ORIGIN_S3_ENDPOINT}
region = ${ORIGIN_S3_REGION}

[destination]
type = s3
provider = ${DESTINATION_S3_PROVIDER}
access_key_id = ${DESTINATION_S3_ACCESS_KEY_ID}
secret_access_key = ${DESTINATION_S3_SECRET_ACCESS_KEY}
endpoint = ${DESTINATION_S3_ENDPOINT}
region = ${DESTINATION_S3_REGION}
`.trim();

  fs.writeFileSync(outputPath, rcloneConfig);
}

async function syncS3() {
  console.log("Syncing S3 buckets...");

  const rcloneConfPath = path.resolve(os.homedir(), "rclone.conf");
  createRcloneConfig(rcloneConfPath);

  const args = [
    "sync",
    `origin:${constructBucketPath(
      ORIGIN_S3_BUCKET,
      ORIGIN_BUCKET_SUBFOLDER
    )}`.trim(),
    `destination:${constructBucketPath(
      DESTINATION_S3_BUCKET,
      DESTINATION_BUCKET_SUBFOLDER
    )}`.trim(),
    `--config=${rcloneConfPath}`,
    "--stats=1s",
  ];

  if (ADDITIONAL_RCLONE_FLAGS) {
    args.push(...ADDITIONAL_RCLONE_FLAGS.split(" "));
  }

  console.log(`Executing: rclone ${args.join(" ")}`);

  await new Promise((resolve, reject) => {
    const child = spawn("rclone", args);

    child.stdout.on("data", (data) => {
      process.stdout.write(data);
    });

    child.stderr.on("data", (data) => {
      process.stderr.write(data);
    });

    child.on("error", (err) => {
      reject(err);
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log("S3 buckets synced successfully.");
        resolve(undefined);
      } else {
        reject(new Error(`rclone exited with code ${code}`));
      }
    });
  });
}

export default async function backup() {
  console.log("Starting backup...");

  await syncS3();

  console.log("Backup completed successfully.");
}
