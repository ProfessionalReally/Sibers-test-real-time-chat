import {z} from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const signupSchema = z.object({
    name: z.string()
        .min(1, "Name is required")
        .transform((value) => value.trim()),

    email: z.string()
        .email("Invalid email")
        .transform((value) => value.trim()),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/^\S*$/, "Password should not contain spaces"),

    confirmPassword: z.string()
        .min(6, "Please confirm your password")
        .regex(/^\S*$/, "Password should not contain spaces"),

    picture: z.instanceof(File, {message: 'Picture is required'})
        .refine((pics) => pics?.type.startsWith('image/'), {
            message: 'Only images are allowed',
        })
        .refine((pics) => pics?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
}).required()
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export default signupSchema;