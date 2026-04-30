"use client";
import { Navigation } from "@/shared/components/sections/navigations/main-navigation";
import { Container } from "@/shared/components/ui/container";
import { Box } from "../../../styled-system/jsx";
import { Hero } from "@/shared/components/sections/hero/hero";
import { Porcess } from "@/shared/components/sections/process/process";
import { WhyChooseUs } from "@/shared/components/sections/why-choose-us/why-choose-us";
import { CtaContainer } from "@/shared/components/sections/cta-section/cta-container";
import { Footer } from "@/shared/components/sections/footer";

export default function LandingPage() {
    return (
        <>
            <Box
                css={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    right: "0",
                    zIndex: "50",
                    borderBottom: "1px solid",
                    borderColor: "gray.400",
                    backgroundColor: "cream.500",
                }}
            >
                <Container>
                    <Navigation />
                </Container>
            </Box>
            <Box css={{ paddingTop: "140px", paddingBottom: "60px", backgroundColor: "cream.500" }}>
                <Container>
                    <Hero />
                </Container>
            </Box>
            <Container id="kako-funkcionira" css={{ paddingY: "90px" }}>
                <Porcess />
            </Container>
            <Box id="o-nama" css={{ backgroundColor: "cream.500" }}>
                <Container>
                    <WhyChooseUs />
                </Container>
            </Box>
            <Box css={{ paddingY: "90px", backgroundColor: "cream.500" }}>
                <Container>
                    <CtaContainer />
                </Container>
            </Box>
            <Box
                css={{
                    padding: "90px",
                }}
            >
                <Container>
                    <Footer />
                </Container>
            </Box>
        </>
    );
}
