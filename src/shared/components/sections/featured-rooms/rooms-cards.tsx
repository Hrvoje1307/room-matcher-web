import { MapPin } from "lucide-react";
import Link from "next/link";
import { Box, styled } from "../../../../../styled-system/jsx";
import { Button } from "../../ui/button";

const rooms = [
    {
        price: "350",
        image: "/mock-folder/room-1.jpg",
        title: "Soba u centru Zagreba",
        location: "Donji grad, Zagreb",
        tags: ["Ne pušač", "Student", "Kućni ljubimci OK"],
        url: "#",
    },
    {
        price: "280",
        image: "/mock-folder/room-2.jpg",
        title: "Studentska soba uz FER",
        location: "Trešnjevka, Zagreb",
        tags: ["Student", "Mirno", "Internet"],
        url: "#",
    },
    {
        price: "320",
        image: "/mock-folder/room-3.jpg",
        title: "Moderan stan na Trsatu",
        location: "Trsat, Rijeka",
        tags: ["Zaposlen", "Ne pušač", "Balkon"],
        url: "#",
    },
];

export function RoomCards() {
    return (
        <Box
            css={{
                display: "grid",
                gridTemplateColumns: { base: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
                gap: "20px",
            }}
        >
            {rooms.map((room, i) => (
                <Box
                    key={i}
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
                        <Box
                            css={{
                                width: "100%",
                                height: "200px",
                                backgroundColor: "sand.300",
                            }}
                            style={{
                                backgroundImage: `url(${room.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        {/* Price badge */}
                        <Box
                            css={{
                                position: "absolute",
                                top: "12px",
                                right: "12px",
                                backgroundColor: "white",
                                borderRadius: "8px",
                                padding: "4px 10px",
                                fontSize: "13px",
                                fontWeight: "700",
                                color: "navy.500",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                            }}
                        >
                            {room.price}€/mj
                        </Box>
                    </Box>

                    {/* Content */}
                    <Box
                        css={{
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            flex: "1",
                            gap: "12px",
                        }}
                    >
                        <Box>
                            <styled.h3
                                css={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    color: "navy.500",
                                    marginBottom: "6px",
                                }}
                            >
                                {room.title}
                            </styled.h3>
                            <Box css={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                <MapPin size={13} color="#737373" />
                                <styled.p css={{ fontSize: "13px", color: "grey.600" }}>
                                    {room.location}
                                </styled.p>
                            </Box>
                        </Box>

                        {/* Tags */}
                        <Box css={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {room.tags.map((tag) => (
                                <styled.span
                                    key={tag}
                                    css={{
                                        fontSize: "12px",
                                        fontWeight: "500",
                                        color: "navy.500",
                                        backgroundColor: "sand.200",
                                        borderRadius: "6px",
                                        padding: "3px 10px",
                                    }}
                                >
                                    {tag}
                                </styled.span>
                            ))}
                        </Box>

                        {/* CTA */}
                        <Box css={{ marginTop: "auto", paddingTop: "4px" }}>
                            <Link href={room.url} style={{ display: "block" }}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    style={{ width: "100%", justifyContent: "center" }}
                                >
                                    Pogledaj oglas
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
