import { Box, useColorModeValue } from '@chakra-ui/react'

/**
 * Overlay de fond en dégradé.
 * Usage: <BackgroundGradient opacity={0.30} />
 */
export default function BackgroundGradient({ opacity = 0.35 }) {
  const darkOverlay = useColorModeValue('transparent', 'blackAlpha.300')

  return (
    <Box position="fixed" inset={0} zIndex={-1} pointerEvents="none"
         bgGradient="linear(to-br, gradStart, gradEnd)" opacity={opacity}>
      <Box position="absolute" inset={0} bg={darkOverlay} />
    </Box>
  )
}
