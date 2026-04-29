"use client";

import { AppNavigation } from "@/shared/components/sections/navigations/app-navigation";
import { SwipeDeck } from "@/shared/components/sections/listings/swipe-deck";
import { Box } from "../../../styled-system/jsx";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/entities/user/queries";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const { data: user, isError, isLoading } = useQuery(getCurrentUser());
    const [favoritesCount, setFavoritesCount] = useState(0);

    useEffect(() => {
        if (isError) {
            router.push("/login");
        }
    }, [isError, router]);

    if (isLoading || isError) return null;

    return (
        <Box css={{ backgroundColor: "cream.500", minHeight: "100dvh", overflow: "hidden" }}>
            <AppNavigation username={user?.name ?? ""} favoritesCount={favoritesCount} />
            <Box css={{ paddingTop: "70px" }}>
                <Box css={{ paddingTop: "28px", paddingX: "24px" }}>
                    <SwipeDeck onFavorite={() => setFavoritesCount((n) => n + 1)} />
                </Box>
            </Box>
        </Box>
    );
}
