import { Box,styled } from "../../../styled-system/jsx";
import { Button } from "@/shared/components/ui/button";
import { Logo } from "@/shared/components/ui/logo";
import Link from "next/link";

export function LandingPage() {
    return <Box css={{backgroundColor:"cream.500"}}>
        <Box css={{
        maxWidth:"1300px",
        width:"100%",
        margin:"0 auto",
        paddingX:"24px",
        
    }}>
        <styled.nav css={{
            display:"flex",
            flex:"1",
            justifyContent:"space-between",
            alignItems:"center",
            paddingY:"20px"
        }}>
            <Logo/>
            <Box css={{
                display:"flex",
                gap:"16px",
                color:"grey.500",
                fontWeight:"400",
            }}>
                <Link href="#">Kako funkcionira</Link>
                <Link href="#">O nama</Link>
                <Link href="#">Oglasi</Link>
            </Box>
            <Box>
             <Button variant="ghost" size="sm">Prijava</Button> 
             <Button variant="primary" size="sm">Registracija</Button> 
            </Box>
        </styled.nav>
    </Box>
    </Box>
}

