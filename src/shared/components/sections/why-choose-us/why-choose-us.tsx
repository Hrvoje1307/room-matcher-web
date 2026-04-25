import { Box, styled } from "../../../../../styled-system/jsx";
import { WhyChooseUsHeading } from "./why-choose-us-heading";
import { WhyChooseUsCards } from "./why-choose-us-cards";

export function WhyChooseUs() {
    return (
        <Box
            css={{
                paddingY: "90px",
                display: "flex",
                flexDirection: { base: "column", md: "row" },
                alignItems: { base: "flex-start", md: "center" },
                gap: { base: "48px", md: "80px" },
            }}
        >
            {/* Left — heading, sticky within section */}
            <Box
                css={{
                    flex: "0 0 auto",
                    maxWidth: { base: "100%", md: "340px" },
                    position: { base: "static", md: "sticky" },
                    top: { md: "90px" },
                    alignSelf: { md: "flex-start" },
                }}
            >
                <WhyChooseUsHeading />
            </Box>

            {/* Right — 2×2 card grid */}
            <WhyChooseUsCards />
        </Box>
    );
}
