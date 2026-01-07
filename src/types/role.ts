import type { Permission } from "./permission";

export interface Role {
  id: number;
  roleName: string;
  // Set<Permission> -> Array
  permissions?: Permission[]; 
}