"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Box, styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import { Container } from "@/shared/components/ui/container";
import { Button } from "@/shared/components/ui/button";
import { AppNavigation } from "@/shared/components/sections/navigations/app-navigation";
import { getCurrentUser } from "@/entities/user/queries";
import { addListingMutationOptions, uploadListingImages, listingsQueryKeys } from "@/entities/listings/queries";
import { newListingSchema, type NewListingFormValues } from "@/shared/shemas/form-validation";
import { Upload, X } from "lucide-react";

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
    const router = useRouter();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [serverError, setServerError] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const { data: user, isError, isLoading } = useQuery(getCurrentUser());

    useEffect(() => {
        if (isError) router.push("/login");
    }, [isError, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewListingFormValues>({
        resolver: zodResolver(newListingSchema),
        defaultValues: {
            title: "",
            address: "",
            price: 0,
            size: 0,
            description: "",
            availableFrom: "",
            isActive: true,
        },
    });

    const { mutate: createListing, isPending } = useMutation({
        ...addListingMutationOptions(),
        onSuccess: async (listing) => {
            if (selectedFiles.length > 0) {
                await uploadListingImages(listing.id, selectedFiles);
            }
            await queryClient.invalidateQueries({ queryKey: listingsQueryKeys.all() });
            router.push("/listings");
        },
        onError: () => {
            setServerError("Greška pri dodavanju oglasa. Pokušajte ponovo.");
        },
    });

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        setSelectedFiles((prev) => [...prev, ...files]);
        setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
        e.target.value = "";
    }

    function removeFile(index: number) {
        URL.revokeObjectURL(previews[index]);
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    }

    function onSubmit(data: NewListingFormValues) {
        setServerError(null);
        createListing(data);
    }

    if (isLoading || isError) return null;

    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
            <AppNavigation username={user?.username ?? ""} />

            <Box css={{ paddingTop: "96px", paddingBottom: "60px", paddingX: "16px" }}>
                <Container>
                    <Box css={{ maxWidth: "640px", marginX: "auto" }}>
                        <styled.h1 css={{ fontSize: "28px", fontWeight: "700", color: "navy.500", marginBottom: "8px" }}>
                            Novi oglas
                        </styled.h1>
                        <styled.p css={{ fontSize: "14px", color: "gray.600", marginBottom: "32px" }}>
                            Ispuni podatke o prostoru koji iznajmljuješ.
                        </styled.p>

                        {serverError && (
                            <Box css={{ backgroundColor: "coral.100", border: "1px solid", borderColor: "coral.300", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px" }}>
                                <styled.p css={{ fontSize: "14px", color: "coral.600" }}>{serverError}</styled.p>
                            </Box>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Naslov */}
                            <Box css={{ marginBottom: "20px" }}>
                                <label className={labelCss}>Naslov</label>
                                <input
                                    {...register("title")}
                                    type="text"
                                    placeholder="npr. Soba u centru Zagreba"
                                    className={errors.title ? inputErrorCss : inputCss}
                                />
                                {errors.title && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.title.message}</styled.p>}
                            </Box>

                            {/* Adresa */}
                            <Box css={{ marginBottom: "20px" }}>
                                <label className={labelCss}>Adresa</label>
                                <input
                                    {...register("address")}
                                    type="text"
                                    placeholder="npr. Ilica 42, Zagreb"
                                    className={errors.address ? inputErrorCss : inputCss}
                                />
                                {errors.address && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.address.message}</styled.p>}
                            </Box>

                            {/* Cijena + Veličina */}
                            <Box css={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                                <Box>
                                    <label className={labelCss}>Cijena (€/mj.)</label>
                                    <input
                                        {...register("price", { valueAsNumber: true })}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="350"
                                        className={errors.price ? inputErrorCss : inputCss}
                                    />
                                    {errors.price && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.price.message}</styled.p>}
                                </Box>
                                <Box>
                                    <label className={labelCss}>Veličina (m²)</label>
                                    <input
                                        {...register("size", { valueAsNumber: true })}
                                        type="number"
                                        min="5"
                                        max="200"
                                        step="1"
                                        placeholder="20"
                                        className={errors.size ? inputErrorCss : inputCss}
                                    />
                                    {errors.size && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.size.message}</styled.p>}
                                </Box>
                            </Box>

                            {/* Dostupno od + Aktivan */}
                            <Box css={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                                <Box>
                                    <label className={labelCss}>Dostupno od</label>
                                    <input
                                        {...register("availableFrom")}
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        className={errors.availableFrom ? inputErrorCss : inputCss}
                                    />
                                    {errors.availableFrom && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.availableFrom.message}</styled.p>}
                                </Box>
                                <Box css={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                    <label className={labelCss}>Status</label>
                                    <Box css={{ display: "flex", alignItems: "center", gap: "10px", paddingY: "13px" }}>
                                        <input
                                            {...register("isActive")}
                                            type="checkbox"
                                            id="isActive"
                                            className={css({ width: "18px", height: "18px", cursor: "pointer", accentColor: "token(colors.coral.500)" })}
                                        />
                                        <styled.label
                                            htmlFor="isActive"
                                            css={{ fontSize: "14px", color: "navy.500", cursor: "pointer", userSelect: "none" }}
                                        >
                                            Aktivan oglas
                                        </styled.label>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Opis */}
                            <Box css={{ marginBottom: "24px" }}>
                                <label className={labelCss}>Opis</label>
                                <styled.textarea
                                    {...register("description")}
                                    placeholder="Opiši prostor, uvjete stanovanja, što je uključeno u cijenu..."
                                    rows={5}
                                    css={{
                                        width: "100%", backgroundColor: "white", border: "1px solid",
                                        borderColor: errors.description ? "red.400" : "gray.400",
                                        borderRadius: "12px", padding: "12px 16px", fontSize: "14px",
                                        color: "navy.500", outline: "none", resize: "vertical",
                                        _placeholder: { color: "gray.500" },
                                        _focus: { borderColor: "coral.400", boxShadow: "0 0 0 3px token(colors.coral.100)" },
                                    }}
                                />
                                {errors.description && <styled.p css={{ fontSize: "12px", color: "red.500", marginTop: "4px" }}>{errors.description.message}</styled.p>}
                            </Box>

                            {/* Slike */}
                            <Box css={{ marginBottom: "28px" }}>
                                <label className={labelCss}>Slike</label>
                                <Box
                                    css={{
                                        border: "2px dashed", borderColor: "gray.400", borderRadius: "12px",
                                        padding: "32px 16px", textAlign: "center", cursor: "pointer",
                                        transition: "all 0.15s ease",
                                        _hover: { borderColor: "coral.400", backgroundColor: "coral.100" },
                                    }}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Box css={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                                        <Upload size={28} color="#c5c1ba" />
                                    </Box>
                                    <styled.p css={{ fontSize: "14px", fontWeight: "500", color: "navy.500", marginBottom: "4px" }}>
                                        Klikni za odabir slika
                                    </styled.p>
                                    <styled.p css={{ fontSize: "12px", color: "gray.600" }}>
                                        JPG, PNG, WEBP — možeš odabrati više odjednom
                                    </styled.p>
                                </Box>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />

                                {previews.length > 0 && (
                                    <Box css={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "12px" }}>
                                        {previews.map((src, i) => (
                                            <Box key={src} css={{ position: "relative", borderRadius: "8px", overflow: "hidden", aspectRatio: "1" }}>
                                                <img
                                                    src={src}
                                                    alt={`Slika ${i + 1}`}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                                <Box
                                                    css={{
                                                        position: "absolute", top: "4px", right: "4px",
                                                        backgroundColor: "white", borderRadius: "999px",
                                                        width: "22px", height: "22px", display: "flex",
                                                        alignItems: "center", justifyContent: "center",
                                                        cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                                                        _hover: { backgroundColor: "coral.100" },
                                                    }}
                                                    onClick={() => removeFile(i)}
                                                >
                                                    <X size={13} color="#525252" />
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>

                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={isPending}
                                style={{ width: "100%", borderRadius: "12px", padding: "14px 24px", fontSize: "15px" }}
                            >
                                {isPending ? "Objavljujem oglas..." : "Objavi oglas"}
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
