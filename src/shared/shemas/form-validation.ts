import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Unesite valjanu email adresu"),
    password: z
        .string()
        .min(8, "Lozinka mora imati najmanje 8 znakova")
        .regex(/[A-Z]/, "Lozinka mora sadržavati najmanje jedno veliko slovo")
        .regex(/[0-9]/, "Lozinka mora sadržavati najmanje jedan broj")
        .regex(/[^A-Za-z0-9]/, "Lozinka mora sadržavati najmanje jedan poseban znak"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
