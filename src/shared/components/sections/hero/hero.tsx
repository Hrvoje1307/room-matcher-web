import { Box } from "../../../../../styled-system/jsx";
import { Banner } from "./banner";
import { HeroMain } from "./hero-main";

export function Hero() {
    return (
        <>
            <Box css={{ display: "flex", justifyContent: { base: "center", md: "flex-start" } }}>
                <Banner />
            </Box>
            <HeroMain />
        </>
    );
}
