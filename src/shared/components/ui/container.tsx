import { Box } from "../../../../styled-system/jsx";
import type { BoxProps } from "../../../../styled-system/jsx";

export function Container({ css: cssProp, children, ...props }: BoxProps) {
    return (
        <Box
            css={{
                maxWidth: "1300px",
                width: "100%",
                margin: "0 auto",
                paddingX: "24px",
                ...cssProp,
            }}
            {...props}
        >
            {children}
        </Box>
    );
}
