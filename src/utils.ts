export function constructBucketPath(bucket: string, subfolder: string) {
  if (!subfolder) return bucket;
  return `${bucket}/${subfolder}`.replace(/\/{2,}/g, "/");
}
