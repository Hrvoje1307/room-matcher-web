import { ark } from "@ark-ui/react/factory";
import { type RecipeVariantProps } from "../../../../styled-system/css";
import { button } from "../../../../styled-system/recipes";

type ButtonVariants = RecipeVariantProps<typeof button>;

type ButtonProps = ButtonVariants &
  React.ComponentPropsWithoutRef<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <ark.button
      className={button({ variant, size })}
      {...props}
    />
  );
}
