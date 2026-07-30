import { z } from "zod";

export const roleSchema = z.enum(["ceo", "cro"]);

export const requestOtpSchema = z.object({ role: roleSchema });

export const verifyOtpSchema = z.object({
  role: roleSchema,
  code: z.string().regex(/^\d{6}$/, "6-digit code required"),
});
