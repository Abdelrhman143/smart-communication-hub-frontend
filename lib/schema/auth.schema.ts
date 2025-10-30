import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "this field is required" : "not a string",
    })
    .max(40, { error: "too long" })
    .min(3, { error: "too short" }),
  email: z.email(),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "this field is required" : "not a string",
    })
    .min(6, { error: "password must me at last 6 character" }),
});

export const loginSchema = z.object({
  email: registerSchema.shape.email,
  password: registerSchema.shape.password,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
