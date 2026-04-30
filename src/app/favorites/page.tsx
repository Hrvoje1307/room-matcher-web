"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, styled } from "../../../styled-system/jsx";
import { AppNavigation } from "@/shared/components/sections/navigations/app-navigation";
import { getCurrentUser } from "@/entities/user/queries";
import { getFavoritesQueryOptions } from "@/entities/favorites/queries";
import Link from "next/link";
import { MapPin, Heart } from "lucide-react";
import { getImageUrl } from "@/shared/utils/image-url";
import type { ListingResponse } from "@/entities/listings/queries";

export default function Page() {
    const router = useRouter();
    const { data: user, isError, isLoading: userLoading } = useQuery(getCurrentUser());
    const { data: favorites, isLoading: favLoading } = useQuery(getFavoritesQueryOptions());

    useEffect(() => {
        if (isError) router.push("/login");
    }, [isError, router]);

    if (userLoading || isError) return null;

    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
            <AppNavigation username={user?.name ?? ""} />
            <Box css={{ paddingTop: "70px", paddingX: "24px", paddingBottom: "40px", maxWidth: "1100px", marginX: "auto" }}>
                <Box css={{ paddingTop: "32px", marginBottom: "24px" }}>
                    <styled.h1 css={{ fontSize: "28px", fontWeight: "700", color: "navy.500", marginBottom: "4px" }}>
                        Moji favoriti
                    </styled.h1>
                    <styled.p css={{ fontSize: "14px", color: "gray.500" }}>
                        {favorites?.length ?? 0} {favorites?.length === 1 ? "oglas" : "oglasa"} spremljeno
                    </styled.p>
                </Box>

                {favLoading ? (
                    <Box css={{ display: "flex", justifyContent: "center", paddingTop: "60px" }}>
                        <styled.p css={{ fontSize: "16px", color: "gray.500" }}>Učitavanje...</styled.p>
                    </Box>
                ) : favorites?.length === 0 ? (
                    <Box css={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", paddingTop: "80px" }}>
                        <Box css={{ width: "64px", height: "64px", borderRadius: "999px", backgroundColor: "coral.100", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Heart size={28} color="#FF6B4A" />
                        </Box>
                        <styled.p css={{ fontSize: "18px", fontWeight: "700", color: "navy.500" }}>Nema favorita</styled.p>
                        <styled.p css={{ fontSize: "14px", color: "gray.500" }}>Swipeaj desno na oglasima koje ti se sviđaju</styled.p>
                    </Box>
                ) : (
                    <Box css={{ display: "grid", gridTemplateColumns: { base: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: "20px" }}>
                        {favorites?.map((listing) => (
                            <FavoriteCard key={listing.id} listing={listing} />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

function FavoriteCard({ listing }: { listing: ListingResponse }) {
    const image = getImageUrl(listing.images[0]?.imageUrl);

    return (
        <Link href={`/listings/${listing.id}`} style={{ display: "block" }}>
        <Box css={{ backgroundColor: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "box-shadow 0.2s", cursor: "pointer", _hover: { boxShadow: "0 6px 24px rgba(0,0,0,0.12)" } }}>
            {/* Image */}
            <Box css={{ height: "200px", position: "relative", overflow: "hidden" }}>
                {image ? (
                    <Box
                        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%" }}
                    />
                ) : (
                    <Box css={{ width: "100%", height: "100%", backgroundColor: "sand.200", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                        <styled.span css={{ fontSize: "32px" }}>🏠</styled.span>
                        <styled.p css={{ fontSize: "12px", color: "gray.500" }}>Nema slike nažalost</styled.p>
                    </Box>
                )}
                <Box css={{ position: "absolute", bottom: "12px", left: "12px", backgroundColor: "white", borderRadius: "999px", paddingX: "12px", paddingY: "5px", fontSize: "13px", fontWeight: "700", color: "navy.500", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                    {listing.price}€/mj
                </Box>
            </Box>

            {/* Body */}
            <Box css={{ padding: "16px" }}>
                <styled.h3 css={{ fontSize: "16px", fontWeight: "700", color: "navy.500", marginBottom: "6px" }}>
                    {listing.title}
                </styled.h3>
                <Box css={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
                    <MapPin size={12} color="#c5c1ba" />
                    <styled.span css={{ fontSize: "12px", color: "gray.500" }}>{listing.address}</styled.span>
                </Box>
                <Box css={{ display: "flex", gap: "6px" }}>
                    <Box css={{ border: "1px solid", borderColor: "gray.300", borderRadius: "999px", paddingX: "10px", paddingY: "4px", fontSize: "11px", color: "gray.600" }}>
                        {listing.size} m²
                    </Box>
                    <Box css={{ border: "1px solid", borderColor: "gray.300", borderRadius: "999px", paddingX: "10px", paddingY: "4px", fontSize: "11px", color: "gray.600" }}>
                        od {listing.availableFrom}
                    </Box>
                </Box>
            </Box>
        </Box>
        </Link>
    );
}
