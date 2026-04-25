import { Box, styled } from "../../../../../styled-system/jsx";

export function PorcessHeading() {
    return (
        <Box
            css={{
                display: "flex",
                textAlign: "center",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <styled.h2
                css={{
                    color: "coral.500",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    fontSize: "14px",
                }}
            >
                Kako funkcionira
            </styled.h2>
            <styled.h1
                css={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "navy.600",
                    letterSpacing: "-1px",
                }}
            >
                Tri koraka do novog doma
            </styled.h1>
            <styled.p
                css={{
                    color: "gray.600",
                    fontSize: "14px",
                }}
            >
                Cijeli proces je jednostavan i transparentan — od registracije do useljenja.
            </styled.p>
        </Box>
    );
}
