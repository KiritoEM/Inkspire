import { z } from "zod";

const signupSchema = z.strictObject({
    pseudo: z.string().min(1, { message: "Pseudo is required !!!" }),
    email: z.string().email({ message: "Email is required !!!" }),
    password: z.string().min(8, { message: "Password must be 8 characters !!!" }),
    location: z.string().min(2, { message: "Location is required" })
})

const loginSchema = z.strictObject({
    email: z.string().email({ message: "Email is required !!!" }),
    password: z.string().min(8, { message: "Password must be 8 characters !!!" }),
})

const postSchema = z.strictObject({
    title: z.string().min(1, { message: "Title is required !!!" }),
    description: z.string().min(1, { message: "Description is required !!!" }),
})

export { signupSchema, loginSchema, postSchema }