"use client";

import { useState } from "react";
import { Box, styled } from "../../../styled-system/jsx";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/ui/logo";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function LandingPage() {
    const [open, setOpen] = useState(false);

    return (
        <Box css={{ backgroundColor: "cream.500" }}>
            <Box css={{
                maxWidth: "1300px",
                width: "100%",
                margin: "0 auto",
                paddingX: "24px",
            }}>
                <styled.nav css={{
                    display: "flex",
                    flex: "1",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingY: "20px",
                }}>
                    <Logo />

                    {/* Desktop links */}
                    <Box css={{
                        display: { base: "none", md: "flex" },
                        gap: "16px",
                        color: "grey.500",
                        fontWeight: "400",
                    }}>
                        <Link href="#">Kako funkcionira</Link>
                        <Link href="#">O nama</Link>
                        <Link href="#">Oglasi</Link>
                    </Box>

                    {/* Desktop buttons */}
                    <Box css={{ display: { base: "none", md: "flex" } }}>
                        <Button variant="ghost" size="sm">Prijava</Button>
                        <Button variant="primary" size="sm">Registracija</Button>
                    </Box>

                    {/* Hamburger */}
                    <styled.button
                        css={{
                            display: { base: "flex", md: "none" },
                            alignItems: "center",
                            justifyContent: "center",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "8px",
                            color: "navy.500",
                        }}
                        onClick={() => setOpen(prev => !prev)}
                        aria-label="Toggle menu"
                    >
                        <span style={{
                            display: "inline-flex",
                            transform: open ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.4s ease-in",
                        }}>
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </span>
                    </styled.button>
                </styled.nav>

                {/* Mobile menu */}
                <Box
                    css={{ display: { base: "block", md: "none" } }}
                    style={{
                        maxHeight: open ? "300px" : "0",
                        opacity: open ? 1 : 0,
                        overflow: "hidden",
                        transition: "all 0.4s ease-in",
                    }}
                >
                    <Box css={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        paddingY: "16px",
                        paddingX: "8px",
                        borderTop: "1px solid",
                        borderColor: "sand.500",
                        color: "grey.500",
                        fontWeight: "400",
                    }}>
                        <Link href="#" onClick={() => setOpen(false)}>Kako funkcionira</Link>
                        <Link href="#" onClick={() => setOpen(false)}>O nama</Link>
                        <Link href="#" onClick={() => setOpen(false)}>Oglasi</Link>
                        <Box css={{ display: "flex", gap: "8px", paddingTop: "8px" }}>
                            <Button variant="ghost" size="sm">Prijava</Button>
                            <Button variant="primary" size="sm">Registracija</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
