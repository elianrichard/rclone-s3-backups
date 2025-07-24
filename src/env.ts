import { envsafe, str, bool } from "envsafe";

export const env = envsafe({
  ORIGIN_S3_ACCESS_KEY_ID: str(),
  ORIGIN_S3_SECRET_ACCESS_KEY: str(),
  ORIGIN_S3_BUCKET: str(),
  ORIGIN_S3_PROVIDER: str({
    desc: "The S3 origin provider you want to use. Supported providers: https://rclone.org/#providers",
  }),
  ORIGIN_S3_REGION: str({
    desc: "The S3 origin region you want to use.",
    default: "auto",
    allowEmpty: true,
  }),
  ORIGIN_S3_ENDPOINT: str({
    desc: "The S3 origin custom endpoint you want to use.",
    default: "",
    allowEmpty: true,
  }),
  ORIGIN_BUCKET_SUBFOLDER: str({
    desc: "A subfolder where the files are stored in the origin bucket. Example: 'backups/folder'",
    default: "",
    allowEmpty: true,
  }),
  DESTINATION_S3_ACCESS_KEY_ID: str(),
  DESTINATION_S3_SECRET_ACCESS_KEY: str(),
  DESTINATION_S3_BUCKET: str(),
  DESTINATION_S3_PROVIDER: str({
    desc: "The S3 destination provider you want to use. Supported providers: https://rclone.org/#providers",
  }),
  DESTINATION_S3_REGION: str({
    desc: "The S3 destination region you want to use.",
    default: "auto",
    allowEmpty: true,
  }),
  DESTINATION_S3_ENDPOINT: str({
    desc: "The S3 destination custom endpoint you want to use.",
    default: "",
    allowEmpty: true,
  }),
  DESTINATION_BUCKET_SUBFOLDER: str({
    desc: "A subfolder where the backup files are stored in the destination bucket. Example: 'backups/folder'",
    default: "",
    allowEmpty: true,
  }),
  BACKUP_CRON_SCHEDULE: str({
    desc: "The cron schedule to run the backup on. This only works if Single Shot Mode is not enabled.",
    default: "0 0 * * *",
    allowEmpty: true,
  }),
  ADDITIONAL_RCLONE_FLAGS: str({
    desc: "Additional flags to pass to rclone. Example: '--transfers 4 --checkers 8'. Read more https://rclone.org/commands",
    default: "",
    allowEmpty: true,
  }),
  RUN_ON_STARTUP: bool({
    desc: "Run a backup on startup of this application",
    default: false,
    allowEmpty: true,
  }),
  SINGLE_SHOT_MODE: bool({
    desc: "Run a single backup on start and exit when completed",
    default: false,
    allowEmpty: true,
  }),
});
