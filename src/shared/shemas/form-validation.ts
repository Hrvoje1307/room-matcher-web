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

const passwordSchema = z
    .string()
    .min(8, "Lozinka mora imati najmanje 8 znakova")
    .regex(/[A-Z]/, "Lozinka mora sadržavati najmanje jedno veliko slovo")
    .regex(/[0-9]/, "Lozinka mora sadržavati najmanje jedan broj")
    .regex(/[^A-Za-z0-9]/, "Lozinka mora sadržavati najmanje jedan poseban znak");

export const registrationSchema = z
    .object({
        fullName: z.string().min(5, "Mora sadržavati najmanje 5 znakova"),
        email: z.string().email("Unesite valjanu email adresu"),
        password: passwordSchema,
        confirmPassword: z.string(),
        city: z.string().min(2, "Unesite naziv grada"),
        phone: z.string().optional(),
        lookingFor: z.enum(["oboje", "trazim-sobu", "nudim-sobu"] as const, {
            message: "Odaberite što tražite",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Lozinke se ne podudaraju",
        path: ["confirmPassword"],
    });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
