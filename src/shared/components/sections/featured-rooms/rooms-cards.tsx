"use client";

import { MapPin } from "lucide-react";
import Link from "next/link";
import { Box, styled } from "../../../../../styled-system/jsx";
import { Button } from "../../ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllListingsQueryOptions } from "@/entities/listings/queries";

export function RoomCards() {
    const { data: listings, isLoading } = useQuery(getAllListingsQueryOptions());

    const rooms = listings?.slice(-3) ?? [];

    if (isLoading) {
        return (
            <Box css={{ display: "grid", gridTemplateColumns: { base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: "20px" }}>
                {[1, 2, 3].map((i) => (
                    <Box key={i} css={{ backgroundColor: "sand.200", borderRadius: "18px", height: "340px", animation: "pulse 1.5s ease-in-out infinite" }} />
                ))}
            </Box>
        );
    }

    return (
        <Box css={{ display: "grid", gridTemplateColumns: { base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: "20px" }}>
            {rooms.map((room) => {
                const image = room.images[0]?.imageUrl;
                return (
                    <Box
                        key={room.id}
                        css={{
                            backgroundColor: "white",
                            borderRadius: "18px",
                            border: "1px solid",
                            borderColor: "sand.400",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Image */}
                        <Box css={{ position: "relative" }}>
                            {image ? (
                                <Box
                                    css={{ width: "100%", height: "200px", backgroundColor: "sand.300" }}
                                    style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                                />
                            ) : (
                                <Box css={{ width: "100%", height: "200px", backgroundColor: "sand.200", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                    <styled.span css={{ fontSize: "32px" }}>🏠</styled.span>
                                    <styled.p css={{ fontSize: "12px", color: "gray.500" }}>Nema slike nažalost</styled.p>
                                </Box>
                            )}
                            <Box css={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "white", borderRadius: "8px", padding: "4px 10px", fontSize: "13px", fontWeight: "700", color: "navy.500", boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}>
                                {room.price}€/mj
                            </Box>
                        </Box>

                        {/* Content */}
                        <Box css={{ padding: "20px", display: "flex", flexDirection: "column", flex: "1", gap: "12px" }}>
                            <Box>
                                <styled.h3 css={{ fontSize: "16px", fontWeight: "700", color: "navy.500", marginBottom: "6px" }}>
                                    {room.title}
                                </styled.h3>
                                <Box css={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                    <MapPin size={13} color="#737373" />
                                    <styled.p css={{ fontSize: "13px", color: "grey.600" }}>{room.address}</styled.p>
                                </Box>
                            </Box>

                            <Box css={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                <styled.span css={{ fontSize: "12px", fontWeight: "500", color: "navy.500", backgroundColor: "sand.200", borderRadius: "6px", padding: "3px 10px" }}>
                                    {room.size} m²
                                </styled.span>
                                <styled.span css={{ fontSize: "12px", fontWeight: "500", color: "navy.500", backgroundColor: "sand.200", borderRadius: "6px", padding: "3px 10px" }}>
                                    od {room.availableFrom}
                                </styled.span>
                            </Box>

                            <Box css={{ marginTop: "auto", paddingTop: "4px" }}>
                                <Link href="/login" style={{ display: "block" }}>
                                    <Button variant="outline" size="sm" style={{ width: "100%", justifyContent: "center" }}>
                                        Pogledaj oglas
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}
