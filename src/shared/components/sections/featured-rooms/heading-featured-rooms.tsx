import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Box, styled } from "../../../../../styled-system/jsx";

export function FeaturedRoomsHeading() {
    return (
        <Box
            css={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: "40px",
                flexWrap: "wrap",
                gap: "16px",
            }}
        >
            <Box>
                <styled.p
                    css={{
                        color: "coral.500",
                        fontSize: "13px",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "8px",
                    }}
                >
                    Aktualni oglasi
                </styled.p>
                <styled.h2
                    css={{
                        fontSize: { base: "32px", md: "42px" },
                        color: "navy.400",
                        fontWeight: "700",
                        lineHeight: "1.1",
                    }}
                >
                    Sobe koje upravo traže cimera
                </styled.h2>
            </Box>

            <Link href="#">
                <Box
                    css={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "navy.500",
                        _hover: { color: "coral.500" },
                        transition: "color 0.2s",
                        paddingBottom: "4px",
                    }}
                >
                    Pogledaj sve oglase
                    <ArrowUpRight size={16} />
                </Box>
            </Link>
        </Box>
    );
}
