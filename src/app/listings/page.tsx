"use client";

import { AppNavigation } from "@/shared/components/sections/navigations/app-navigation";
import { Box, styled } from "../../../styled-system/jsx";
import { Container } from "@/shared/components/ui/container";

const mockUser = {
    username: "Hrvoje Cuckovic",
    favoritesCount: 1,
};

export default function Page() {
    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh" }}>
            <AppNavigation username={mockUser.username} favoritesCount={mockUser.favoritesCount} />
            <Box css={{ paddingTop: "80px" }}>
                <Container css={{ paddingY: "40px" }}>
                    <styled.h1 css={{ fontSize: "28px", fontWeight: "700", color: "navy.500" }}>
                        Oglasi
                    </styled.h1>
                </Container>
            </Box>
        </Box>
    );
}
