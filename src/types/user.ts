import type { ApiResponse } from "./common";
import type { Lecturer } from "./lecturer";
import type { Role } from "./role";
import type { Student } from "./student";
import type { UserStatus } from "./userStatus";

export interface User {
  id: string;
  email: string;
  
  status: UserStatus;

  teacher?: Lecturer | null; 
  student?: Student | null;

  roles: Role[];
}

export interface UserProfile {
    id: string;
    email: string;
    role: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    avtUrl: string;
    campus: string;
    expertise: string;
    bio: string;
    status: UserStatus;
}

export interface UpdateProfilePayload {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    expertise: string;
    bio: string;
    dateOfBirth: string;
    campus: string;
    avtUrl?: string; // Dùng cho cập nhật ảnh
}

export interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export type ProfileResponse = ApiResponse<UserProfile>;