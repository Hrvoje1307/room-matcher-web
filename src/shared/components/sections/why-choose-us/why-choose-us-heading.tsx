import { Box,styled } from "../../../../../styled-system/jsx";

export function WhyChooseUsHeading() {
    return (
        <Box>
            <styled.h2
                css={{
                    color: "coral.400",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    marginBottom: "10px",
                }}
            >
                Zašto cimer
            </styled.h2>
            <styled.h1
                css={{
                    color: "navy.400",
                    fontSize: "48px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    marginBottom: "10px",
                }}
            >
                Napravljeno za <br /> stvarne ljude.
            </styled.h1>
            <styled.p
                css={{
                    color: "gray.600",
                    fontSize: "16px",
                }}
            >
                Bez beskonačnih grupa na društvenim mrežama i sumnjivih oglasa. Cimer ti daje alate da pronađeš osobu s kojom ćeš se zaista slagati.
            </styled.p>
        </Box>
    );
}
