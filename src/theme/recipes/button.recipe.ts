import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
    className: "button",
    base: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        borderRadius: "24px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s",
        border: "none",
        _disabled: { opacity: 0.5, cursor: "not-allowed" },
    },
    variants: {
        variant: {
            primary: {
                bg: "coral.500",
                color: "white",
                _hover: { opacity: 0.9 },
            },
            secondary: {
                bg: "navy.500",
                color: "white",
                _hover: { opacity: 0.85 },
            },
            
            outline: {
                bg: "transparent",
                border: "1px solid",
                borderColor: "gray.500",
                color: "gray.600",
                _hover: { bg: "gray.100", color: "navy.600", borderColor: "gray.600" },
            },
            ghost: {
                bg: "transparent",
                color: "navy.500",
                _hover: { color: "sand.500" },
            },
            white: {
                bg: "white",
                color: "navy.500",
                _hover: { opacity: 0.92 },
            },
        },
        size: {
            sm: { px: "18px", py: "9px", fontSize: "14px" },
            md: { px: "24px", py: "12px", fontSize: "14px" },
            lg: { px: "28px", py: "14px", fontSize: "18px" },
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});
