import { z } from "zod";
import { loginSchema, signupSchema } from ".";

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>