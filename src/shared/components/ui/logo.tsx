import { House } from "lucide-react";
import { Box, styled } from "../../../../styled-system/jsx";

export function Logo() {
  return (
    <Box css={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Box
        css={{
          bg: "navy.500",
          color: "white",
          p: "8px",
          borderRadius: "20px",
          display: "flex",
        }}
      >
        <House size={16} />
      </Box>
      <styled.p css={{ color: "navy.500", fontWeight: "700" }}>
        Room Matcher
      </styled.p>
    </Box>
  );
}
