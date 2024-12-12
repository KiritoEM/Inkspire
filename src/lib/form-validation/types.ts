import { z } from "zod";
import { loginSchema, signupSchema } from ".";

export type LoginSchemaTypes = z.infer<typeof loginSchema>;
export type SignupSchemaTypes = z.infer<typeof signupSchema>;