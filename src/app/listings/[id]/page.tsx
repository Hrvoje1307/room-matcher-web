"use client";

import { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, styled } from "../../../../styled-system/jsx";
import { Container } from "@/shared/components/ui/container";
import { AppNavigation } from "@/shared/components/sections/navigations/app-navigation";
import { getCurrentUser } from "@/entities/user/queries";
import { getListingByIdQueryOptions } from "@/entities/listings/queries";
import { MapPin, ArrowLeft, CalendarDays, Ruler } from "lucide-react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [photoIndex, setPhotoIndex] = useState(0);

    const { data: user, isError: userError, isLoading: userLoading } = useQuery(getCurrentUser());
    const { data: listing, isLoading, isError } = useQuery(getListingByIdQueryOptions(id));

    useEffect(() => {
        if (userError) router.push("/login");
    }, [userError, router]);

    if (userLoading || userError) return null;

    if (isLoading) {
        return (
            <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
                <AppNavigation username={user?.username ?? ""} />
                <Box css={{ paddingTop: "96px", display: "flex", justifyContent: "center", paddingY: "80px" }}>
                    <styled.p css={{ fontSize: "16px", color: "gray.500" }}>Učitavanje oglasa...</styled.p>
                </Box>
            </Box>
        );
    }

    if (isError || !listing) {
        return (
            <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
                <AppNavigation username={user?.username ?? ""} />
                <Box css={{ paddingTop: "96px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", paddingY: "80px" }}>
                    <styled.p css={{ fontSize: "20px", fontWeight: "700", color: "navy.500" }}>Oglas nije pronađen</styled.p>
                    <Link href="/favorites">
                        <styled.span css={{ fontSize: "14px", color: "coral.500", cursor: "pointer", _hover: { color: "coral.600" } }}>
                            Natrag na favorite
                        </styled.span>
                    </Link>
                </Box>
            </Box>
        );
    }

    const hasImages = listing.images.length > 0;

    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
            <AppNavigation username={user?.username ?? ""} />

            <Box css={{ paddingTop: "80px", paddingBottom: "60px" }}>
                {/* Back button */}
                <Container css={{ paddingY: "16px" }}>
                    <Link href="/favorites">
                        <Box css={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "gray.600", fontSize: "14px", cursor: "pointer", _hover: { color: "navy.500" } }}>
                            <ArrowLeft size={16} />
                            <span>Natrag na favorite</span>
                        </Box>
                    </Link>
                </Container>

                {/* Image gallery */}
                {hasImages ? (
                    <Box css={{ position: "relative", backgroundColor: "navy.500", marginBottom: "32px" }}>
                        <Box
                            style={{ backgroundImage: `url(${listing.images[photoIndex]?.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
                            css={{ height: { base: "260px", md: "440px" }, width: "100%" }}
                        />

                        {listing.images.length > 1 && (
                            <>
                                {/* Progress dots */}
                                <Box css={{ position: "absolute", bottom: "16px", left: "50%", display: "flex", gap: "6px" }} style={{ transform: "translateX(-50%)" }}>
                                    {listing.images.map((_, i) => (
                                        <Box
                                            key={i}
                                            onClick={() => setPhotoIndex(i)}
                                            css={{ width: "8px", height: "8px", borderRadius: "999px", cursor: "pointer", transition: "all 0.2s" }}
                                            style={{ backgroundColor: i === photoIndex ? "white" : "rgba(255,255,255,0.45)" }}
                                        />
                                    ))}
                                </Box>

                                {/* Prev / Next */}
                                {photoIndex > 0 && (
                                    <Box
                                        onClick={() => setPhotoIndex((i) => i - 1)}
                                        css={{ position: "absolute", left: "16px", top: "50%", backgroundColor: "white", borderRadius: "999px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", _hover: { backgroundColor: "cream.500" } }}
                                        style={{ transform: "translateY(-50%)" }}
                                    >
                                        <ArrowLeft size={18} color="#1A1F3C" />
                                    </Box>
                                )}
                                {photoIndex < listing.images.length - 1 && (
                                    <Box
                                        onClick={() => setPhotoIndex((i) => i + 1)}
                                        css={{ position: "absolute", right: "16px", top: "50%", backgroundColor: "white", borderRadius: "999px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", _hover: { backgroundColor: "cream.500" } }}
                                        style={{ transform: "translateY(-50%) rotate(180deg)" }}
                                    >
                                        <ArrowLeft size={18} color="#1A1F3C" />
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                ) : (
                    <Box css={{ height: "260px", backgroundColor: "sand.200", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
                        <styled.span css={{ fontSize: "48px" }}>🏠</styled.span>
                        <styled.p css={{ fontSize: "14px", color: "gray.500" }}>Nema slike nažalost</styled.p>
                    </Box>
                )}

                <Container>
                    <Box css={{ display: "grid", gridTemplateColumns: { base: "1fr", lg: "1fr 340px" }, gap: "32px", alignItems: "flex-start" }}>
                        {/* Main content */}
                        <Box>
                            <styled.h1 css={{ fontSize: { base: "24px", md: "32px" }, fontWeight: "700", color: "navy.500", marginBottom: "10px" }}>
                                {listing.title}
                            </styled.h1>

                            <Box css={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
                                <MapPin size={15} color="#c5c1ba" />
                                <styled.span css={{ fontSize: "15px", color: "gray.500" }}>{listing.address}</styled.span>
                            </Box>

                            <Box css={{ borderTop: "1px solid", borderColor: "gray.300", paddingTop: "24px" }}>
                                <styled.h2 css={{ fontSize: "16px", fontWeight: "700", color: "navy.500", marginBottom: "12px" }}>
                                    O prostoru
                                </styled.h2>
                                <styled.p css={{ fontSize: "15px", color: "gray.600", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
                                    {listing.description || "Bez opisa."}
                                </styled.p>
                            </Box>
                        </Box>

                        {/* Info card */}
                        <Box css={{ backgroundColor: "white", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", position: { lg: "sticky" }, top: { lg: "90px" }, alignSelf: { lg: "flex-start" } }}>
                            <styled.p css={{ fontSize: "28px", fontWeight: "800", color: "coral.500", marginBottom: "4px" }}>
                                {listing.price}€
                                <styled.span css={{ fontSize: "14px", fontWeight: "400", color: "gray.500" }}>/mjesec</styled.span>
                            </styled.p>

                            <Box css={{ borderTop: "1px solid", borderColor: "gray.200", marginY: "16px" }} />

                            <Box css={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                <Box css={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <Box css={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "cream.500", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Ruler size={16} color="#1A1F3C" />
                                    </Box>
                                    <Box>
                                        <styled.p css={{ fontSize: "11px", color: "gray.500", textTransform: "uppercase", letterSpacing: "0.06em" }}>Veličina</styled.p>
                                        <styled.p css={{ fontSize: "14px", fontWeight: "600", color: "navy.500" }}>{listing.size} m²</styled.p>
                                    </Box>
                                </Box>

                                <Box css={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <Box css={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "cream.500", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <CalendarDays size={16} color="#1A1F3C" />
                                    </Box>
                                    <Box>
                                        <styled.p css={{ fontSize: "11px", color: "gray.500", textTransform: "uppercase", letterSpacing: "0.06em" }}>Dostupno od</styled.p>
                                        <styled.p css={{ fontSize: "14px", fontWeight: "600", color: "navy.500" }}>{listing.availableFrom}</styled.p>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
