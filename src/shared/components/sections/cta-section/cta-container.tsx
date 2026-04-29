import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Box, styled } from "../../../../../styled-system/jsx";
import { Button } from "../../ui/button";

export function CtaContainer() {
    return (
        <Box
            css={{
                position: "relative",
                overflow: "hidden",
                backgroundColor: "coral.500",
                borderRadius: "24px",
                padding: { base: "48px 32px", md: "64px 72px" },
                display: "flex",
                flexDirection: { base: "column", md: "row" },
                alignItems: { base: "flex-start", md: "center" },
                justifyContent: "space-between",
                gap: "40px",
            }}
        >
            <style>{`
                @keyframes ctaFloat1 {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33%      { transform: translate(18px, -14px) scale(1.06); }
                    66%      { transform: translate(-10px, 10px) scale(0.96); }
                }
                @keyframes ctaFloat2 {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33%      { transform: translate(-16px, 12px) scale(0.94); }
                    66%      { transform: translate(12px, -16px) scale(1.07); }
                }
                .cta-circle-1 {
                    animation: ctaFloat1 7s ease-in-out infinite;
                }
                .cta-circle-2 {
                    animation: ctaFloat2 9s ease-in-out infinite;
                }
            `}</style>

            {/* Decorative circle — bottom left */}
            <Box
                className="cta-circle-1"
                css={{
                    position: "absolute",
                    bottom: "-80px",
                    left: "-80px",
                    width: "260px",
                    height: "260px",
                    borderRadius: "50%",
                    backgroundColor: "coral.400",
                    opacity: "0.5",
                    pointerEvents: "none",
                }}
            />

            {/* Decorative circle — top right */}
            <Box
                className="cta-circle-2"
                css={{
                    position: "absolute",
                    top: "-70px",
                    right: "-60px",
                    width: "220px",
                    height: "220px",
                    borderRadius: "50%",
                    backgroundColor: "coral.400",
                    opacity: "0.5",
                    pointerEvents: "none",
                }}
            />

            {/* Text */}
            <Box css={{ position: "relative", zIndex: "1" }}>
                <styled.h2
                    css={{
                        fontSize: { base: "36px", md: "48px" },
                        fontWeight: "700",
                        color: "white",
                        lineHeight: "1.1",
                        marginBottom: "16px",
                    }}
                >
                    Spreman/a za novu sobu?
                </styled.h2>
                <styled.p
                    css={{
                        fontSize: "16px",
                        color: "white",
                        opacity: "0.85",
                        maxWidth: "460px",
                        lineHeight: "1.6",
                    }}
                >
                    Registracija je besplatna i traje 2 minute. Pridruži se tisućama korisnika koji su već našli svog cimera.
                </styled.p>
            </Box>

            {/* Button */}
            <Box css={{ position: "relative", zIndex: "1", flexShrink: "0" }}>
                <Link href="/login">
                    <Button variant="white" size="lg">
                        Počni odmah <ArrowRight size={18} />
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
