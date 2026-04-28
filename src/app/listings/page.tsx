"use client";

import { AppNavigation } from "@/shared/components/sections/navigations/app-navigation";
import { SwipeDeck } from "@/shared/components/sections/listings/swipe-deck";
import { Box } from "../../../styled-system/jsx";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/entities/user/queries";

export default function Page() {
    const { data: user } = useQuery(getCurrentUser());

    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh", overflow: "hidden" }}>
            <AppNavigation username={user?.name ?? ""} favoritesCount={0} />
            <Box css={{ paddingTop: "70px" }}>
                <Box css={{ paddingTop: "28px", paddingX: "24px" }}>
                    <SwipeDeck />
                </Box>
            </Box>
        </Box>
    );
}
