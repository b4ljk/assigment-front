import { z } from "zod";

export const ProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string(),
  image: z.string().optional(),
});

export type ProfileType = z.infer<typeof ProfileSchema>;

export interface GetProfileType {
  id: number;
  email: null;
  name: null;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  phone: string;
}
