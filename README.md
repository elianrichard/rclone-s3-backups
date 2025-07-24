# Rclone S3 Backups

A simple NodeJS application to backup your S3 bucket storage to another S3 bucket using [rclone](https://rclone.org/).

## Configuration

Set the following environment variables in your `.env` file or as system environment variables:

- `ORIGIN_S3_ACCESS_KEY_ID`: Access key ID for the source S3 bucket
- `ORIGIN_S3_SECRET_ACCESS_KEY`: Secret access key for the source S3 bucket
- `ORIGIN_S3_BUCKET`: Name of the source S3 bucket
- `ORIGIN_S3_PROVIDER`: S3 provider for the source bucket (see supported providers: [rclone providers](https://rclone.org/#providers))
- `ORIGIN_S3_REGION`: Region for the source S3 bucket (default: "auto")
- `ORIGIN_S3_ENDPOINT`: Custom endpoint for the source S3 bucket (optional)
- `ORIGIN_BUCKET_SUBFOLDER`: Subfolder in the source bucket to backup (optional)

- `DESTINATION_S3_ACCESS_KEY_ID`: Access key ID for the destination S3 bucket
- `DESTINATION_S3_SECRET_ACCESS_KEY`: Secret access key for the destination S3 bucket
- `DESTINATION_S3_BUCKET`: Name of the destination S3 bucket
- `DESTINATION_S3_PROVIDER`: S3 provider for the destination bucket (see supported providers: [rclone providers](https://rclone.org/#providers))
- `DESTINATION_S3_REGION`: Region for the destination S3 bucket (default: "auto")
- `DESTINATION_S3_ENDPOINT`: Custom endpoint for the destination S3 bucket (optional)
- `DESTINATION_BUCKET_SUBFOLDER`: Subfolder in the destination bucket to store backups (optional)

- `BACKUP_CRON_SCHEDULE`: Cron schedule for running backups (default: `0 0 * * *`)
- `ADDITIONAL_RCLONE_FLAGS`: Additional flags to pass to rclone (optional)
- `RUN_ON_STARTUP`: Set to `true` to run a backup on application startup
- `SINGLE_SHOT_MODE`: Set to `true` to run a single backup and exit

Refer to the [envsafe configuration](src/env.ts) for more details on

## Future Improvements

- Add support for direct backup / restore to local volume
