import {z} from "zod";

const loginSchema = z.object({
    email: z.string()
        .email("Invalid email")
        .transform((value) => value.trim()),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/^\S*$/, "Password should not contain spaces"),
}).required()

export default loginSchema;