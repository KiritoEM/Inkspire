import { z } from "zod";
import { loginSchema } from ".";

export type LoginSchemaTypes = z.infer<typeof loginSchema>;