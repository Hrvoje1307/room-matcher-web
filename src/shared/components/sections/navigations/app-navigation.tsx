"use client";

import Link from "next/link";
import { Box, styled } from "../../../../../styled-system/jsx";
import { Logo } from "../../ui/logo";
import { Heart, LogOut, PlusCircle } from "lucide-react";
import { Container } from "../../ui/container";
import { authTokens } from "@/shared/utils/auth-tokens";
import { fetchData } from "@/shared/hooks/fetchData";
import { useRouter } from "next/navigation";

interface AppNavigationProps {
    username: string;
    favoritesCount?: number;
}

export function AppNavigation({ username, favoritesCount = 0 }: AppNavigationProps) {
    const router = useRouter();

    async function handleLogout() {
        try {
            await fetchData({ url: "/api/auth/logout", method: "POST" });
        } finally {
            authTokens.clear();
            router.push("/login");
        }
    }
    return (
        <Box
            css={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: "50",
                backgroundColor: "cream.500",
                borderBottom: "1px solid",
                borderColor: "gray.400",
            }}
        >
            <Container>
                <Box
                    css={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent:"space-between",
                        paddingY: "16px",
                    }}
                >

                    {/* Center — Logo */}
                    <Link href="/listings">
                        <Logo />
                    </Link>

                    {/* Right — Favorites + Username + Logout */}
                    <Box
                        css={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "20px",
                        }}
                    >
                        {/* New listing */}
                        <Link href="/new-listing">
                            <Box
                                css={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    backgroundColor: "coral.500",
                                    color: "white",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    borderRadius: "8px",
                                    paddingX: "12px",
                                    paddingY: "7px",
                                    cursor: "pointer",
                                    _hover: { backgroundColor: "coral.600" },
                                }}
                            >
                                <PlusCircle size={15} />
                                <span>Dodaj oglas</span>
                            </Box>
                        </Link>

                        {/* Favorites */}
                        <Link href="/favorites">
                            <Box
                                css={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    color: "gray.600",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    _hover: { color: "coral.500" },
                                }}
                            >
                                <Heart size={16} />
                                <span>Favoriti</span>
                                {favoritesCount > 0 && (
                                    <Box
                                        css={{
                                            backgroundColor: "coral.500",
                                            color: "white",
                                            borderRadius: "999px",
                                            fontSize: "11px",
                                            fontWeight: "700",
                                            minWidth: "18px",
                                            height: "18px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingX: "5px",
                                        }}
                                    >
                                        {favoritesCount}
                                    </Box>
                                )}
                            </Box>
                        </Link>

                        {/* Username */}
                        <Link href="/profile">
                            <styled.span
                                css={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "navy.500",
                                    _hover: { color: "coral.500" },
                                    cursor: "pointer",
                                }}
                            >
                                {username}
                            </styled.span>
                        </Link>

                        {/* Logout */}
                        <styled.button
                            onClick={handleLogout}
                            css={{
                                display: "flex",
                                alignItems: "center",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "gray.500",
                                padding: "0",
                                _hover: { color: "coral.500" },
                            }}
                            aria-label="Odjava"
                        >
                            <LogOut size={18} />
                        </styled.button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
