import api from "@/lib/axios";
import { ProfileType } from "./type";

export const getProfile = async () => {
  return await api.get("/v1/users/me");
};

export const changeProfile = async (data: ProfileType) => {
  return await api.patch("/v1/users/me", data);
};
