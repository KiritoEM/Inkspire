import { z } from "zod";
import { loginSchema, postSchema, signupSchema } from ".";

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type PostSchema = z.infer<typeof postSchema>;