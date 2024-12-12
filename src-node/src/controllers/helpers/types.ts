import { SignupSchema } from "@/schemas/SchemaTypes";
import { JwtPayload } from "jsonwebtoken";

interface SignupWithJWT extends JwtPayload, SignupSchema { }

export type { SignupWithJWT }