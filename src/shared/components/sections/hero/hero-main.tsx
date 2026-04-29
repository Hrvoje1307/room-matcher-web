import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Box, styled } from "../../../../../styled-system/jsx";
import { Button } from "../../ui/button";
import { House } from "../../svg/house";

export function HeroMain() {
    return (
        <Box
            css={{
                display: "flex",
                flexDirection: { base: "column", md: "row" },
                alignItems: "center",
                gap: "40px",
                paddingBottom: "80px",
            }}
        >
            <Box css={{ flex: "1", textAlign: { base: "center", md: "left" } }}>
                <styled.h1
                    css={{
                        color: "navy.400",
                        fontSize: "54px",
                        lineHeight: "1.1",
                        letterSpacing: "5px",
                        fontWeight: "700",
                        marginBottom: "10px",
                        "&::after": {
                            content: '""',
                            display: "block",
                            maxWidth: "200px",
                            height: "7px",
                            borderRadius: "8px",
                            backgroundColor: "coral.400",
                            marginTop: "4px",
                            marginX: { base: "auto", md: "0" },
                        },
                    }}
                >
                    Pronađi
                    <br /> savršenog <br />
                    cimera.
                </styled.h1>
                <styled.p
                    css={{
                        fontSize: "18px",
                        color: "gray.600",
                        marginTop: "22px",
                        fontWeight: "500",
                    }}
                >
                    Postavi oglas za sobu ili traži cimera — sve na jednom <br /> mjestu. Brzo,
                    sigurno i besplatno.
                </styled.p>

                <Box
                    css={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { base: "center", md: "flex-start" },
                        marginTop: "50px",
                        gap: "18px",
                    }}
                >
                    <Link href="/login">
                        <Button size="md">
                            Objavi sobu <ArrowRight width={18} height={18} />
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button size={"md"} variant={"outline"}>
                            <Search width={18} height={18} />
                            Traži cimera
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Box
                css={{
                    flex: "1",
                    display: { base: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <House />
            </Box>
        </Box>
    );
}
