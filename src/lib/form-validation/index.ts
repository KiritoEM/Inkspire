import { z } from "zod";

const loginSchema = z.strictObject({
    email: z.string().email({ message: "Email is required !!!" }),
    password: z.string().min(8, { message: "Password must be 8 characters !!!" }),
})

export { loginSchema }