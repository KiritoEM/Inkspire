import { z } from "zod";
import { signupSchema } from "./";

export type SignupSchema = z.infer<typeof signupSchema>