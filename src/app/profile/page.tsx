"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Box, styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import { Container } from "@/shared/components/ui/container";
import { Button } from "@/shared/components/ui/button";
import { AppNavigation } from "@/shared/components/sections/navigations/app-navigation";
import { getCurrentUser, updateUserMutationOptions, usersQueryKeys } from "@/entities/user/queries";
import { profileSchema, type ProfileFormValues } from "@/shared/shemas/form-validation";
import { Eye, EyeOff } from "lucide-react";

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

const selectCss = css({
    width: "100%", backgroundColor: "white", border: "1px solid",
    borderColor: "gray.400", borderRadius: "12px", padding: "12px 16px",
    fontSize: "14px", color: "navy.500", outline: "none", cursor: "pointer", appearance: "auto",
    _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
});

export default function Page() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);

    const { data: user, isError, isLoading } = useQuery(getCurrentUser());

    useEffect(() => {
        if (isError) router.push("/login");
    }, [isError, router]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            gender: "MALE",
            bio: "",
            dateOfBirth: "",
            profileImageUrl: "",
            currentPassword: "",
            newPassword: "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name ?? "",
                username: user.username ?? "",
                email: user.email ?? "",
                gender: user.gender ?? "MALE",
                bio: user.bio ?? "",
                dateOfBirth: user.dateOfBirth ?? "",
                profileImageUrl: user.profileImageUrl ?? "",
                currentPassword: "",
                newPassword: "",
            });
        }
    }, [user, reset]);

    const { mutate: updateUser, isPending } = useMutation({
        ...updateUserMutationOptions(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: usersQueryKeys.all() });
            setSuccess(true);
            setServerError(null);
            reset((values) => ({ ...values, currentPassword: "", newPassword: "" }));
        },
        onError: () => {
            setServerError("Greška pri ažuriranju podataka. Provjerite trenutnu lozinku.");
            setSuccess(false);
        },
    });

    function onSubmit(data: ProfileFormValues) {
        setServerError(null);
        setSuccess(false);
        updateUser({
            name: data.name,
            username: data.username,
            email: data.email,
            gender: data.gender,
            bio: data.bio,
            dateOfBirth: data.dateOfBirth,
            profileImageUrl: data.profileImageUrl,
            ...(data.newPassword
                ? { currentPassword: data.currentPassword, newPassword: data.newPassword }
                : {}),
        });
    }

    if (isLoading || isError) return null;

    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
            <AppNavigation username={user?.username ?? ""} />

            <Box css={{ paddingTop: "96px", paddingBottom: "60px", paddingX: "16px" }}>
                <Container>
                    <Box css={{ maxWidth: "560px", marginX: "auto" }}>
                        <styled.h1 css={{ fontSize: "28px", fontWeight: "700", color: "navy.500", marginBottom: "8px" }}>
                            Uredi profil
                        </styled.h1>
                        <styled.p css={{ fontSize: "14px", color: "gray.600", marginBottom: "32px" }}>
                            Ažuriraj svoje osobne podatke.
                        </styled.p>

                        {serverError && (
                            <Box css={{ backgroundColor: "coral.100", border: "1px solid", borderColor: "coral.300", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                                <styled.p css={{ fontSize: "14px", color: "coral.600" }}>{serverError}</styled.p>
                            </Box>
                        )}

                        {success && (
                            <Box css={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                                <styled.p css={{ fontSize: "14px", color: "#16a34a" }}>Podaci su uspješno ažurirani.</styled.p>
                            </Box>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Ime */}
                            <Box css={{ marginBottom: "20px" }}>
                                <label className={labelCss}>Ime</label>
                                <input {...register("name")} type="text" placeholder="Marko Marković" className={errors.name ? inputErrorCss : inputCss} />
                                {errors.name && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.name.message}</styled.p>}
                            </Box>

                            {/* Korisničko ime */}
                            <Box css={{ marginBottom: "20px" }}>
                                <label className={labelCss}>Korisničko ime</label>
                                <input {...register("username")} type="text" placeholder="marko123" className={errors.username ? inputErrorCss : inputCss} />
                                {errors.username && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.username.message}</styled.p>}
                            </Box>

                            {/* Email */}
                            <Box css={{ marginBottom: "20px" }}>
                                <label className={labelCss}>Email</label>
                                <input {...register("email")} type="email" placeholder="marko@primjer.hr" className={errors.email ? inputErrorCss : inputCss} />
                                {errors.email && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.email.message}</styled.p>}
                            </Box>

                            {/* Spol + Datum rođenja */}
                            <Box css={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                                <Box>
                                    <label className={labelCss}>Spol</label>
                                    <select {...register("gender")} className={selectCss}>
                                        <option value="MALE">Muški</option>
                                        <option value="FEMALE">Ženski</option>
                                        <option value="OTHER">Ostalo</option>
                                    </select>
                                    {errors.gender && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.gender.message}</styled.p>}
                                </Box>
                                <Box>
                                    <label className={labelCss}>Datum rođenja</label>
                                    <input
                                        {...register("dateOfBirth")}
                                        type="date"
                                        max={new Date().toISOString().split("T")[0]}
                                        className={errors.dateOfBirth ? inputErrorCss : inputCss}
                                    />
                                    {errors.dateOfBirth && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.dateOfBirth.message}</styled.p>}
                                </Box>
                            </Box>

                            {/* Bio */}
                            <Box css={{ marginBottom: "20px" }}>
                                <label className={labelCss}>O sebi</label>
                                <styled.textarea
                                    {...register("bio")}
                                    placeholder="Napiši nešto o sebi..."
                                    rows={3}
                                    css={{
                                        width: "100%", backgroundColor: "white", border: "1px solid",
                                        borderColor: errors.bio ? "red.400" : "gray.400",
                                        borderRadius: "12px", padding: "12px 16px", fontSize: "14px",
                                        color: "navy.500", outline: "none", resize: "none",
                                        _placeholder: { color: "gray.500" },
                                        _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                    }}
                                />
                                {errors.bio && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.bio.message}</styled.p>}
                            </Box>

                            {/* Profilna slika URL */}
                            <Box css={{ marginBottom: "28px" }}>
                                <label className={labelCss}>URL profilne slike</label>
                                <input {...register("profileImageUrl")} type="url" placeholder="https://..." className={errors.profileImageUrl ? inputErrorCss : inputCss} />
                                {errors.profileImageUrl && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.profileImageUrl.message}</styled.p>}
                            </Box>

                            {/* Promjena lozinke */}
                            <Box css={{ borderTop: "1px solid", borderColor: "gray.300", paddingTop: "24px", marginBottom: "28px" }}>
                                <styled.p css={{ fontSize: "13px", fontWeight: "600", color: "gray.600", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                                    Promjena lozinke
                                </styled.p>
                                <styled.p css={{ fontSize: "13px", color: "gray.600", marginBottom: "16px" }}>
                                    Ostavi prazno ako ne želiš mijenjati lozinku.
                                </styled.p>

                                <Box css={{ marginBottom: "16px" }}>
                                    <label className={labelCss}>Trenutna lozinka</label>
                                    <Box css={{ position: "relative" }}>
                                        <input
                                            {...register("currentPassword")}
                                            type={showCurrent ? "text" : "password"}
                                            placeholder="Trenutna lozinka"
                                            className={css({
                                                width: "100%", backgroundColor: "white", border: "1px solid",
                                                borderColor: errors.currentPassword ? "red.400" : "gray.400",
                                                borderRadius: "12px", padding: "12px 48px 12px 16px",
                                                fontSize: "14px", color: "navy.500", outline: "none",
                                                _placeholder: { color: "gray.500" },
                                                _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                            })}
                                        />
                                        <styled.button type="button" onClick={() => setShowCurrent((v) => !v)}
                                            css={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "gray.500", display: "flex", alignItems: "center", padding: "0", _hover: { color: "navy.500" } }}>
                                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </styled.button>
                                    </Box>
                                    {errors.currentPassword && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.currentPassword.message}</styled.p>}
                                </Box>

                                <Box>
                                    <label className={labelCss}>Nova lozinka</label>
                                    <Box css={{ position: "relative" }}>
                                        <input
                                            {...register("newPassword")}
                                            type={showNew ? "text" : "password"}
                                            placeholder="Nova lozinka (najmanje 8 znakova)"
                                            className={css({
                                                width: "100%", backgroundColor: "white", border: "1px solid",
                                                borderColor: errors.newPassword ? "red.400" : "gray.400",
                                                borderRadius: "12px", padding: "12px 48px 12px 16px",
                                                fontSize: "14px", color: "navy.500", outline: "none",
                                                _placeholder: { color: "gray.500" },
                                                _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                            })}
                                        />
                                        <styled.button type="button" onClick={() => setShowNew((v) => !v)}
                                            css={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "gray.500", display: "flex", alignItems: "center", padding: "0", _hover: { color: "navy.500" } }}>
                                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </styled.button>
                                    </Box>
                                    {errors.newPassword && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.newPassword.message}</styled.p>}
                                </Box>
                            </Box>

                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={isPending}
                                style={{ width: "100%", borderRadius: "12px", padding: "14px 24px", fontSize: "15px" }}
                            >
                                {isPending ? "Spremanje..." : "Spremi promjene"}
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
