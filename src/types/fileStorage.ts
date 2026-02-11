// src/constants/storage.ts

export const STORAGE_FOLDERS = {
  AVATARS: "fapanese/avatars",
  COURSE: "fapanese/courses",
  DOCUMENTS: "documents",
  SYSTEM: "system_configs",
} as const; // "as const" giúp TypeScript hiểu đây là các giá trị không đổi (readonly)

export const DEFAULT_IMAGES = {
  AVATAR: "https://res.cloudinary.com/dsfpeioth/image/upload/v1767265678/student_avatar_xncvkx.png",
};