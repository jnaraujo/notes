import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, {
      message: "Title must have at least 1 character",
    }),
  content: z
    .string({
      required_error: "Content is required",
    })
    .max(10000, {
      message: "Content must have at most 10000 characters",
    }),
  isPublic: z.coerce.boolean().optional().default(false),
});

export const noteIdSchema = z.object({
  id: z.string({
    required_error: "Note ID is required",
  }),
});

export const usernameSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  }),
});
