"use client";

import { Logo } from "@/shared/components/ui/logo";
import { Box, styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import Link from "next/link";
import { Container } from "@/shared/components/ui/container";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationFormValues } from "@/shared/shemas/form-validation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerMutationOptions } from "@/entities/auth/mutations";
import { useRouter } from "next/navigation";

const inputCss = css({
    width: "100%", backgroundColor: "white", border: "1px solid",
    borderColor: "gray.400", borderRadius: "12px", padding: "12px 16px",
    fontSize: "14px", color: "navy.500", outline: "none",
    _placeholder: { color: "gray.500" },
    _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
});

const inputErrorCss = css({
    width: "100%", backgroundColor: "white", border: "1px solid",
    borderColor: "red.400", borderRadius: "12px", padding: "12px 16px",
    fontSize: "14px", color: "navy.500", outline: "none",
    _placeholder: { color: "gray.500" },
    _focus: { borderColor: "red.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
});

const labelCss = css({
    display: "block", fontSize: "11px", fontWeight: "600",
    letterSpacing: "0.08em", textTransform: "uppercase", color: "gray.600", marginBottom: "8px",
});

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const { mutate: registerUser, isPending } = useMutation({
        ...registerMutationOptions(),
        onSuccess() {
            router.push("/login");
        },
        onError() {
            setServerError("Registracija nije uspjela. Možda korisničko ime ili email već postoje.");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormValues>({
        resolver: zodResolver(registrationSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            city: "",
            phone: "",
            lookingFor: "oboje",
        },
    });

    function onSubmit(data: RegistrationFormValues) {
        setServerError(null);
        registerUser({
            username: data.username,
            email: data.email,
            password: data.password,
            name: data.fullName,
        });
    }

    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
            <Box css={{ borderBottom: "1px solid #e0deda", paddingY: "20px" }}>
                <Container>
                    <Link href="/">
                        <Logo />
                    </Link>
                </Container>
            </Box>
            <Box css={{ display: "flex", justifyContent: "center", paddingTop: "48px", paddingBottom: "60px", paddingX: "16px" }}>
                <Box css={{ width: "100%", maxWidth: "440px" }}>
                    <styled.h1 css={{ fontSize: "32px", fontWeight: "700", color: "navy.500", marginBottom: "8px" }}>
                        Otvori račun
                    </styled.h1>
                    <styled.p css={{ fontSize: "14px", color: "gray.600", marginBottom: "32px" }}>
                        Već imaš račun?{" "}
                        <Link href="/login" className={css({ color: "coral.500", fontWeight: "600", _hover: { color: "coral.600" } })}>
                            Prijavi se
                        </Link>
                    </styled.p>

                    {serverError && (
                        <Box css={{ backgroundColor: "coral.100", border: "1px solid", borderColor: "coral.300", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                            <styled.p css={{ fontSize: "14px", color: "coral.600" }}>{serverError}</styled.p>
                        </Box>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Ime i prezime */}
                        <Box css={{ marginBottom: "20px" }}>
                            <label className={labelCss}>Ime i prezime</label>
                            <input {...register("fullName")} type="text" placeholder="Ana Anić" className={errors.fullName ? inputErrorCss : inputCss} />
                            {errors.fullName && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.fullName.message}</styled.p>}
                        </Box>

                        {/* Korisničko ime */}
                        <Box css={{ marginBottom: "20px" }}>
                            <label className={labelCss}>Korisničko ime</label>
                            <input {...register("username")} type="text" placeholder="ana123" className={errors.username ? inputErrorCss : inputCss} />
                            {errors.username && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.username.message}</styled.p>}
                        </Box>

                        {/* Email */}
                        <Box css={{ marginBottom: "20px" }}>
                            <label className={labelCss}>Email</label>
                            <input {...register("email")} type="email" placeholder="ana@primjer.hr" className={errors.email ? inputErrorCss : inputCss} />
                            {errors.email && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.email.message}</styled.p>}
                        </Box>

                        {/* Lozinka */}
                        <Box css={{ marginBottom: "20px" }}>
                            <label className={labelCss}>Lozinka</label>
                            <Box css={{ position: "relative" }}>
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Najmanje 8 znakova"
                                    className={css({
                                        width: "100%", backgroundColor: "white", border: "1px solid",
                                        borderColor: errors.password ? "red.400" : "gray.400",
                                        borderRadius: "12px", padding: "12px 48px 12px 16px", fontSize: "14px",
                                        color: "navy.500", outline: "none",
                                        _placeholder: { color: "gray.500" },
                                        _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                    })}
                                />
                                <styled.button type="button" onClick={() => setShowPassword((v) => !v)}
                                    css={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "gray.500", display: "flex", alignItems: "center", padding: "0", _hover: { color: "navy.500" } }}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </styled.button>
                            </Box>
                            {errors.password && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.password.message}</styled.p>}
                        </Box>

                        {/* Ponovite lozinku */}
                        <Box css={{ marginBottom: "20px" }}>
                            <label className={labelCss}>Ponovite lozinku</label>
                            <Box css={{ position: "relative" }}>
                                <input
                                    {...register("confirmPassword")}
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Ponovite lozinku"
                                    className={css({
                                        width: "100%", backgroundColor: "white", border: "1px solid",
                                        borderColor: errors.confirmPassword ? "red.400" : "gray.400",
                                        borderRadius: "12px", padding: "12px 48px 12px 16px", fontSize: "14px",
                                        color: "navy.500", outline: "none",
                                        _placeholder: { color: "gray.500" },
                                        _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                    })}
                                />
                                <styled.button type="button" onClick={() => setShowConfirm((v) => !v)}
                                    css={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "gray.500", display: "flex", alignItems: "center", padding: "0", _hover: { color: "navy.500" } }}>
                                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </styled.button>
                            </Box>
                            {errors.confirmPassword && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.confirmPassword.message}</styled.p>}
                        </Box>

                        {/* Grad + Telefon */}
                        <Box css={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                            <Box>
                                <label className={labelCss}>Grad</label>
                                <input {...register("city")} type="text" placeholder="Zagreb" className={errors.city ? inputErrorCss : inputCss} />
                                {errors.city && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.city.message}</styled.p>}
                            </Box>
                            <Box>
                                <label className={labelCss}>Telefon (opcionalno)</label>
                                <input {...register("phone")} type="tel" placeholder="+385..." className={inputCss} />
                            </Box>
                        </Box>

                        {/* Što tražiš */}
                        <Box css={{ marginBottom: "28px" }}>
                            <label className={labelCss}>Što tražiš?</label>
                            <styled.select
                                {...register("lookingFor")}
                                css={{
                                    width: "100%", backgroundColor: "white", border: "1px solid",
                                    borderColor: errors.lookingFor ? "red.400" : "gray.400",
                                    borderRadius: "12px", padding: "12px 16px", fontSize: "14px",
                                    color: "navy.500", outline: "none", cursor: "pointer", appearance: "auto",
                                    _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                }}
                            >
                                <option value="oboje">Oboje</option>
                                <option value="trazim-sobu">Tražim sobu</option>
                                <option value="nudim-sobu">Nudim sobu</option>
                            </styled.select>
                        </Box>

                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            disabled={isPending}
                            style={{ width: "100%", borderRadius: "12px", padding: "14px 24px", fontSize: "15px" }}
                        >
                            {isPending ? "Otvaranje računa..." : "Otvori račun"}
                        </Button>

                        <styled.p css={{ fontSize: "12px", color: "gray.500", textAlign: "center", marginTop: "16px", lineHeight: "1.6" }}>
                            Klikom potvrđuješ da prihvaćaš naše{" "}
                            <Link href="#" className={css({ color: "navy.500", _hover: { color: "coral.500" } })}>Uvjete korištenja</Link>
                            {" "}i{" "}
                            <Link href="#" className={css({ color: "navy.500", _hover: { color: "coral.500" } })}>Pravila privatnosti</Link>.
                        </styled.p>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}
