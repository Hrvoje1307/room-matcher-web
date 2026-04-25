import { Euro, SlidersHorizontal, ShieldCheck, Zap } from "lucide-react";
import { Box, styled } from "../../../../../styled-system/jsx";
import type { LucideIcon } from "lucide-react";
function FeatureIcon({ Icon }: { Icon: LucideIcon }) {
    return (
        <Box
            css={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "coral.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
                flexShrink: "0",
            }}
        >
            <Icon size={20} color="#FF6B4A" strokeWidth={1.8} />
        </Box>
    );
}

const cards = [
    {
        Icon: Zap,
        heading: "Brzo i jednostavno",
        description: "Registracija u dvije minute. Jasno sučelje koje radi posao za tebe.",
    },
    {
        Icon: SlidersHorizontal,
        heading: "Pametni filteri",
        description: "Filtriraj po lokaciji, cijeni, stilu života, navikama i još mnogo toga.",
    },
    {
        Icon: ShieldCheck,
        heading: "Sigurna komunikacija",
        description: "Razgovaraj s cimerima unutar platforme — bez dijeljenja osobnog broja.",
    },
    {
        Icon: Euro,
        heading: "Besplatno korištenje",
        description: "Bez skrivenih troškova i provizija. Cimer je i ostaje besplatan.",
    },
];

export function WhyChooseUsCards() {
    return (
        <Box
            css={{
                flex: "1",
                display: "grid",
                gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
                gap: "16px",
                width: "100%",
            }}
        >
            {cards.map((card, i) => (
                <Box
                    key={i}
                    css={{
                        backgroundColor: "white",
                        borderRadius: "18px",
                        border: "1px solid",
                        borderColor: "sand.400",
                        padding: "28px",
                    }}
                >
                    <FeatureIcon Icon={card.Icon} />
                    <styled.h3
                        css={{
                            fontSize: "17px",
                            fontWeight: "700",
                            color: "navy.500",
                            marginBottom: "8px",
                        }}
                    >
                        {card.heading}
                    </styled.h3>
                    <styled.p
                        css={{
                            fontSize: "14px",
                            color: "grey.600",
                            lineHeight: "1.65",
                        }}
                    >
                        {card.description}
                    </styled.p>
                </Box>
            ))}
        </Box>
    );
}
