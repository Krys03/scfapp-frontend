import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },

  // ✅ Couleurs “brand” + tokens sémantiques solides (pas transparents)
  semanticTokens: {
    colors: {
      // Dégradé (boutons / accents / logo)
      gradStart: { default: "#6366F1", _dark: "#6366F1" }, // indigo
      gradEnd:   { default: "#22D3EE", _dark: "#22D3EE" }, // cyan

      // ✅ Navbar solide (plus de whiteAlpha/blackAlpha)
      headerBg:      { default: "#ffffff", _dark: "#0b1020" },
      headerBorder:  { default: "gray.200", _dark: "whiteAlpha.300" },

      // Surfaces & textes
      bg:            { default: "#f8fafc", _dark: "#0a0f1f" },
      bgCard:        { default: "#ffffff", _dark: "rgba(255,255,255,0.04)" },
      textMuted:     { default: "gray.600", _dark: "gray.300" },
    },
  },

  styles: {
    global: {
      "html, body, #root": { height: "100%" },
      body: {
        bg: "bg",
      },
    },
  },

  components: {
    Button: {
      variants: {
        // Bouton dégradé (réutilisé partout)
        neo: {
          bgGradient: "linear(to-r, gradStart, gradEnd)",
          color: "white",
          _hover: {
            filter: "brightness(1.05)",
          },
          _active: {
            filter: "brightness(0.98)",
          },
        },
      },
      defaultProps: {
        size: "md",
      },
    },
    Container: {
      baseStyle: {
        px: { base: 4, md: 6 },
      },
    },
  },
});

export default theme;
