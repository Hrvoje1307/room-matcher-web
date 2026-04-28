"use client";

import { Logo } from "@/shared/components/ui/logo";
import { Box, styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import Link from "next/link";
import { Container } from "@/shared/components/ui/container";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/shared/shemas/form-validation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginMutationOptions } from "@/entities/auth/mutations";
import { authTokens } from "@/shared/utils/auth-tokens";
import { useRouter } from "next/navigation";

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();

    const { mutate: login, isPending } = useMutation({
        ...loginMutationOptions(),
        onSuccess(data) {
            authTokens.set(data.accessToken, data.refreshToken);
            router.push("/listings");
        },
        onError() {
            setServerError("Pogrešno korisničko ime ili lozinka.");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: { username: "", password: "" },
    });

    function onSubmit(data: LoginFormValues) {
        setServerError(null);
        login({ username: data.username, password: data.password });
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
            <Box css={{ display: "flex", justifyContent: "center", paddingTop: "60px", paddingX: "16px" }}>
                <Box css={{ width: "100%", maxWidth: "400px" }}>
                    <styled.h1 css={{ fontSize: "32px", fontWeight: "700", color: "navy.500", marginBottom: "8px" }}>
                        Prijavi se
                    </styled.h1>
                    <styled.p css={{ fontSize: "14px", color: "gray.600", marginBottom: "32px" }}>
                        Nemaš račun?{" "}
                        <Link href="/registration" className={css({ color: "coral.500", fontWeight: "600", _hover: { color: "coral.600" } })}>
                            Registriraj se besplatno
                        </Link>
                    </styled.p>

                    {serverError && (
                        <Box css={{ backgroundColor: "coral.100", border: "1px solid", borderColor: "coral.300", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                            <styled.p css={{ fontSize: "14px", color: "coral.600" }}>{serverError}</styled.p>
                        </Box>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box css={{ marginBottom: "20px" }}>
                            <styled.label css={{ display: "block", fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "gray.600", marginBottom: "8px" }}>
                                Korisničko ime
                            </styled.label>
                            <styled.input
                                {...register("username")}
                                type="text"
                                placeholder="ana123"
                                css={{
                                    width: "100%", backgroundColor: "white", border: "1px solid",
                                    borderColor: errors.username ? "red.400" : "gray.400",
                                    borderRadius: "12px", padding: "12px 16px", fontSize: "14px",
                                    color: "navy.500", outline: "none",
                                    _placeholder: { color: "gray.500" },
                                    _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                }}
                            />
                            {errors.username && (
                                <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>
                                    {errors.username.message}
                                </styled.p>
                            )}
                        </Box>

                        <Box css={{ marginBottom: "28px" }}>
                            <Box css={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                <styled.label css={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "gray.600" }}>
                                    Lozinka
                                </styled.label>
                                <Link href="#" className={css({ fontSize: "12px", color: "coral.500", _hover: { color: "coral.600" } })}>
                                    Zaboravili ste lozinku?
                                </Link>
                            </Box>
                            <Box css={{ position: "relative" }}>
                                <styled.input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    css={{
                                        width: "100%", backgroundColor: "white", border: "1px solid",
                                        borderColor: errors.password ? "red.400" : "gray.400",
                                        borderRadius: "12px", padding: "12px 48px 12px 16px", fontSize: "14px",
                                        color: "navy.500", outline: "none",
                                        _placeholder: { color: "gray.500" },
                                        _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                    }}
                                />
                                <styled.button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    css={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "gray.500", display: "flex", alignItems: "center", padding: "0", _hover: { color: "navy.500" } }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </styled.button>
                            </Box>
                            {errors.password && (
                                <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>
                                    {errors.password.message}
                                </styled.p>
                            )}
                        </Box>

                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            disabled={isPending}
                            style={{ width: "100%", borderRadius: "12px", padding: "14px 24px", fontSize: "15px" }}
                        >
                            {isPending ? "Prijava..." : "Prijavi se"}
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );
}
