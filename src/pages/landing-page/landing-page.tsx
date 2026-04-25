"use client";
import { Navigation } from "@/shared/components/sections/navigation";
import { Container } from "@/shared/components/ui/container";
import { Box } from "../../../styled-system/jsx";
import { Hero } from "@/shared/components/sections/hero/hero";
import { Porcess } from "@/shared/components/sections/process/process";

export default function LandingPage() {
    return (
        <Box>
            <Box
                css={{
                    borderBottom: "1px solid",
                    borderColor: "grey.400",
                    backgroundColor: "cream.500",
                }}
            >
                <Container>
                    <Navigation />
                </Container>
            </Box>
            <Container css={{ paddingY: "60px", backgroundColor: "cream.500" }}>
                <Hero />
            </Container>
            <Container css={{ paddingY: "80px" }}>
                <Porcess />
            </Container>
        </Box>
    );
}
