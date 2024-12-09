import { z } from "zod";

const signupSchema = z.strictObject({
    pseudo: z.string().min(1, { message: "Pseudo is required !!!" }),
    email: z.string().email({ message: "Email is required !!!" }),
    password: z.string().min(8, { message: "Password must be 8 characters !!!" })
})

export { signupSchema }