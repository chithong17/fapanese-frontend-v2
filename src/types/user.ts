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