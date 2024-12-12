import { z } from "zod";

const loginSchema = z.strictObject({
    email: z.string().email({ message: "Email is required !!!" }),
    password: z.string().min(8, { message: "Password must be 8 characters !!!" }),
})

const signupSchema = z.strictObject({
    email: z.string().email({ message: "Email is required !!!" }),
    password: z.string().min(8, { message: "Password must be 8 characters !!!" }),
    location: z.string().min(2, { message: "Location is required" }),
    pseudo: z.string().min(1, { message: "Pseudo is required !!!" }),
})

export { loginSchema, signupSchema }