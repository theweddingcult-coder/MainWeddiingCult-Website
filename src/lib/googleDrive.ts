export type DriveImageVariant = "cdn" | "download" | "view" | "thumbnail";

const DRIVE_VARIANT_BUILDERS: Record<DriveImageVariant, (fileId: string) => string> = {
  cdn: (fileId) => `https://lh3.googleusercontent.com/d/${fileId}=w2400`,
  download: (fileId) => `https://drive.google.com/uc?export=download&id=${fileId}&authuser=0`,
  view: (fileId) => `https://drive.google.com/uc?export=view&id=${fileId}&authuser=0`,
  thumbnail: (fileId) => `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`,
};

const FILE_ID_PATTERNS = [
  /\/file\/d\/([^/]+)/, // https://drive.google.com/file/d/FILE_ID/view
  /\/d\/([^/?]+)/, // https://lh3.googleusercontent.com/d/FILE_ID=...
  /[?&]id=([^&]+)/, // ...?id=FILE_ID
];

const sanitizeFileId = (raw?: string | null) => {
  if (!raw) return null;
  const withoutQuery = raw.split(/[?#]/)[0];
  return withoutQuery.split("=")[0];
};

export const extractDriveFileId = (url: string): string | null => {
  for (const pattern of FILE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) {
      const sanitized = sanitizeFileId(match[1]);
      if (sanitized) {
        return sanitized;
      }
    }
  }
  return null;
};

export const buildDriveImageUrl = (
  fileId: string,
  variant: DriveImageVariant = "download"
): string => {
  const builder = DRIVE_VARIANT_BUILDERS[variant];
  return builder(fileId);
};

export const normalizeDriveImageUrl = (
  url: string,
  variant: DriveImageVariant = "cdn"
): string => {
  const fileId = extractDriveFileId(url);
  if (!fileId) return url;
  return buildDriveImageUrl(fileId, variant);
};

