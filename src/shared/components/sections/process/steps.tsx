import { Handshake, SearchCheck, User } from "lucide-react";
import { Box, styled } from "../../../../../styled-system/jsx";
import type { LucideIcon } from "lucide-react";

function StepIcon({ Icon }: { Icon: LucideIcon }) {
    return (
        <Box
            css={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "navy.500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: "0",
            }}
        >
            <Icon size={22} color="white" strokeWidth={1.8} />
        </Box>
    );
}

const steps = [
    {
        Icon: User,
        heading: "Kreiraj profil",
        description: "Napravi besplatan profil u nekoliko minuta i predstavi se budućim cimerima.",
    },
    {
        Icon: SearchCheck,
        heading: "Postavi oglas ili pretraži",
        description: "Objavi svoju sobu ili filtriraj oglase po lokaciji, cijeni i stilu života.",
    },
    {
        Icon: Handshake,
        heading: "Poveži se i dogovori",
        description: "Komuniciraj sigurno unutar platforme i dogovori useljenje.",
    },
];

export function Steps() {
    return (
        <Box
            css={{
                marginY: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
            }}
        >
            {steps.map((step, index) => (
                <Box
                    key={index}
                    css={{
                        maxWidth: "380px",
                        width: "100%",
                        backgroundColor: "cream.500",
                        padding: "24px",
                        borderRadius: "18px",
                        border: "1px solid #c5c1ba",
                    }}
                >
                    <Box
                        css={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                        }}
                    >
                        <StepIcon Icon={step.Icon} />
                        <styled.p css={{ color: "gray.200", fontSize: "24px", fontWeight: "600" }}>
                            0{index + 1}
                        </styled.p>
                    </Box>
                    <styled.h3
                        css={{
                            fontSize: "17px",
                            fontWeight: "700",
                            color: "navy.500",
                            marginBottom: "8px",
                        }}
                    >
                        {step.heading}
                    </styled.h3>
                    <styled.p css={{ fontSize: "14px", color: "grey.600", lineHeight: "1.6" }}>
                        {step.description}
                    </styled.p>
                </Box>
            ))}
        </Box>
    );
}
