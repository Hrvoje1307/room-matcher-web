import { Box, styled } from "../../../../../styled-system/jsx";

export function Banner() {
    return (
        <Box
            css={{
                padding: "5px 10px",
                bgColor: "cream.200",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
                border: "1px solid #D4D4D4",
                borderRadius: "20px",
                marginBottom:"40px",
                marginTop:"100px",
            }}
        >
            <Box
                css={{
                    borderRadius: "50%",
                    backgroundColor: "coral.500",
                    width: "8px",
                    height: "8px",
                    flexShrink: "0",
                    marginRight: "8px",
                }}
            ></Box>
            <styled.h1
                css={{
                    fontSize: "12px",
                    color: "navy.600",
                    fontWeight: "400",
                }}
            >
                Nova platforma za cimere u Hrvatskoj
            </styled.h1>
        </Box>
    );
}
