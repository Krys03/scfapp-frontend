import { Box, useToken } from "@chakra-ui/react";

/**
 * LogoHelvio
 * - Fond carré à coins arrondis (pas rond)
 * - Monogramme "H" fin : deux piliers + pont courbe (style d’origine)
 * - Même gradient que les boutons (gradStart → gradEnd)
 * - Taille par défaut augmentée (64px), ajustable via `boxSize`
 *   Exemple: <LogoHelvio boxSize="72px" rounded="xl" />
 */
export default function LogoHelvio({ boxSize = "43px", rounded = "xl", ...props }) {
  const [gradStart, gradEnd] = useToken("colors", ["gradStart", "gradEnd"]);
  const c1 = gradStart || "#6366F1";
  const c2 = gradEnd || "#22D3EE";

  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      boxSize={boxSize}
      rounded={rounded}
      bgGradient={`linear(to-r, ${c1}, ${c2})`}
      boxShadow="0 10px 30px rgba(0,0,0,0.25)"
      position="relative"
      overflow="hidden"
      aria-label="Helvio"
      {...props}
    >
      {/* reflet léger */}
      <Box
        position="absolute"
        top="-18%"
        left="-10%"
        w="140%"
        h="56%"
        rounded="full"
        bg="whiteAlpha.400"
        filter="blur(12px)"
        opacity={0.35}
        pointerEvents="none"
      />
      {/* Monogramme H fin (deux piliers + pont courbe) */}
      <Box as="svg" viewBox="0 0 64 64" boxSize="68%" zIndex={1}>
        {/* piliers */}
        <rect x="12" y="10" width="10" height="44" rx="5" fill="#fff" />
        <rect x="42" y="10" width="10" height="44" rx="5" fill="#fff" />
        {/* pont courbe (fin) */}
        <path
          d="M16 28 C 24 22, 40 34, 48 28"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </Box>
    </Box>
  );
}
