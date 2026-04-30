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

export const newListingSchema = z.object({
    title: z.string().min(2, "Naslov mora imati najmanje 2 znaka").max(150, "Naslov ne smije biti duži od 150 znakova"),
    address: z.string().min(5, "Adresa mora imati najmanje 5 znakova").max(150, "Adresa ne smije biti duža od 150 znakova"),
    price: z.number().positive("Cijena mora biti veća od 0"),
    size: z.number().min(5, "Veličina mora biti najmanje 5 m²").max(200, "Veličina ne smije biti veća od 200 m²"),
    description: z.string().max(1000, "Opis ne smije biti duži od 1000 znakova"),
    availableFrom: z.string().min(1, "Odaberite datum dostupnosti"),
    isActive: z.boolean(),
});

export type NewListingFormValues = z.infer<typeof newListingSchema>;

export const profileSchema = z
    .object({
        name: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
        username: z.string().min(2, "Korisničko ime mora imati najmanje 2 znaka"),
        email: z.string().email("Unesite valjanu email adresu"),
        gender: z.enum(["MALE", "FEMALE", "OTHER"] as const, { message: "Odaberite spol" }),
        bio: z.string().max(1000, "Bio ne smije biti duži od 1000 znakova"),
        dateOfBirth: z.string().min(1, "Unesite datum rođenja").refine(
            (val) => new Date(val) < new Date(),
            "Datum rođenja mora biti u prošlosti"
        ),
        profileImageUrl: z.string(),
        currentPassword: z.string(),
        newPassword: z.string(),
    })
    .refine((data) => !data.newPassword || !!data.currentPassword, {
        message: "Unesite trenutnu lozinku za promjenu lozinke",
        path: ["currentPassword"],
    })
    .refine((data) => !data.newPassword || data.newPassword.length >= 8, {
        message: "Nova lozinka mora imati najmanje 8 znakova",
        path: ["newPassword"],
    });

export type ProfileFormValues = z.infer<typeof profileSchema>;
