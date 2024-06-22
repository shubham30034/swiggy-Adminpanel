import { z } from "zod";

// Login validation schema
export const loginValidation = ({ email, password }) => {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long")
    });

    const result = schema.safeParse({ email, password });
    return result;
};


export const signupValidation = ({ email, password, name, number }) => {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        name: z.string().min(1, "Name is required"),
        number: z.string().regex(/^\d{10}$/, "Number must be a 10-digit string")
    });

    const result = schema.safeParse({ email, password, name, number });
    return result;
};
