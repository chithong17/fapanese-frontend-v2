import api from "@/lib/axios";
import type { ChangePasswordPayload, UserProfile } from "@/types/user";

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const res = await api.get("/users/profile");
    return res.data.result;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const res = await api.post("/users/profile/update", data);
    return res.data.result;
  },

  changePassword: async (data: ChangePasswordPayload) => {
    const res = await api.put("/users/change-password", data);
    return res.data;
  }
};