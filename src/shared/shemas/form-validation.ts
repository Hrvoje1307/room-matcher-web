import { z } from "zod";

const passwordSchema = z
    .string()
    .min(8, "Lozinka mora imati najmanje 8 znakova")
    .regex(/[A-Z]/, "Lozinka mora sadržavati najmanje jedno veliko slovo")
    .regex(/[0-9]/, "Lozinka mora sadržavati najmanje jedan broj")
    .regex(/[^A-Za-z0-9]/, "Lozinka mora sadržavati najmanje jedan poseban znak");

export const loginSchema = z.object({
    username: z.string().min(3, "Unesite korisničko ime"),
    password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registrationSchema = z
    .object({
        name: z.string().min(2, "Unesite svoje ime"),
        username: z.string().min(3, "Korisničko ime mora imati najmanje 3 znaka"),
        email: z.string().email("Unesite valjanu email adresu"),
        gender: z.enum(["MALE", "FEMALE", "OTHER"] as const, { message: "Odaberite spol" }),
        dateOfBirth: z.string().min(1, "Unesite datum rođenja").refine(
            (val) => new Date(val) < new Date(),
            "Datum rođenja mora biti u prošlosti"
        ),
        bio: z.string().min(10, "Bio mora imati najmanje 10 znakova"),
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Lozinke se ne podudaraju",
        path: ["confirmPassword"],
    });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
