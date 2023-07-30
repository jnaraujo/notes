import { z } from "zod";

export const userLoginSchema = z.object({
  login: z
    .string({
      required_error: "Email or username is required",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const userRegisterSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  username: z.string({
    required_error: "Username is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must have at least 8 characters",
    }),
});

export const usernameSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
});
