import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "20px",
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
        border: "2px solid",
        borderColor: "coral.500",
        color: "coral.500",
        _hover: { bg: "coral.500", color: "white" },
      },
      ghost: {
        bg: "transparent",
        color: "navy.500",
        _hover: { color: "sand.500" },
      },
    },
    size: {
      sm: { px: "12px", py: "6px", fontSize: "14px" },
      md: { px: "20px", py: "10px", fontSize: "16px" },
      lg: { px: "28px", py: "14px", fontSize: "18px" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
