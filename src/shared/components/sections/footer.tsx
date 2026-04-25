import Link from "next/link";
import { Globe, Hash, AtSign } from "lucide-react";
import { Box, styled } from "../../../../styled-system/jsx";
import { Logo } from "../ui/logo";

const columns = [
    {
        heading: "Platforma",
        links: ["O nama", "Kako funkcionira", "Cjenik", "Blog"],
    },
    {
        heading: "Podrška",
        links: ["Kontakt", "Pomoć", "FAQ", "Sigurnost"],
    },
    {
        heading: "Pravno",
        links: ["Privatnost", "Uvjeti korištenja", "Kolačići", "GDPR"],
    },
];

export function Footer() {
    return (
        <Box
            css={{
                borderTop: "1px solid",
                borderColor: "sand.400",
                paddingTop: "60px",
            }}
        >
            {/* Top row */}
            <Box
                css={{
                    display: "grid",
                    gridTemplateColumns: { base: "1fr", md: "1.6fr 1fr 1fr 1fr" },
                    gap: { base: "40px", md: "32px" },
                    paddingBottom: "48px",
                }}
            >
                {/* Brand col */}
                <Box>
                    <Logo />
                    <styled.p
                        css={{
                            color: "grey.600",
                            fontSize: "14px",
                            lineHeight: "1.65",
                            marginTop: "14px",
                            maxWidth: "240px",
                        }}
                    >
                        Pronađi savršenog cimera. Hrvatska platforma za sobe, stanove i suživot.
                    </styled.p>
                </Box>

                {/* Link columns */}
                {columns.map((col) => (
                    <Box key={col.heading}>
                        <styled.p
                            css={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "navy.500",
                                marginBottom: "20px",
                            }}
                        >
                            {col.heading}
                        </styled.p>
                        <Box css={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {col.links.map((link) => (
                                <Link key={link} href="#">
                                    <styled.span
                                        css={{
                                            fontSize: "14px",
                                            color: "grey.600",
                                            _hover: { color: "navy.500" },
                                            transition: "color 0.2s",
                                        }}
                                    >
                                        {link}
                                    </styled.span>
                                </Link>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Divider */}
            <Box css={{ borderTop: "1px solid", borderColor: "sand.400" }} />

            {/* Bottom bar */}
            <Box
                css={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingY: "24px",
                    flexWrap: "wrap",
                    gap: "12px",
                }}
            >
                <styled.p css={{ fontSize: "13px", color: "grey.600" }}>
                    © 2026 Room Matcher. Sva prava pridržana.
                </styled.p>
                <styled.p css={{ fontSize: "13px", color: "grey.600" }}>
                    Made with care in Zagreb 🇭🇷
                </styled.p>
            </Box>
        </Box>
    );
}
