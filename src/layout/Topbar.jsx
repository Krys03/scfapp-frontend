import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import LogoHelvio from "../ui/LogoHelvio";

export default function Topbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { accessToken } = useAuth();

  const bg = useColorModeValue("rgba(255,255,255,0.55)", "rgba(15,23,42,0.55)");
  const border = useColorModeValue("blackAlpha.200", "whiteAlpha.300");

  return (
    <Box
      as="header"
      position="sticky"         // 👈 sticky = prend sa place, pas besoin de padding-top ailleurs
      top={0}
      zIndex={1000}
      bg={bg}
      style={{ backdropFilter: "saturate(180%) blur(12px)" }}
      borderBottom="1px solid"
      borderColor={border}
    >
      <Container maxW="6xl">
        <Flex h="52px" align="center" justify="space-between">
          <HStack as={RouterLink} to="/" spacing={3}>
            <LogoHelvio boxSize="43px" />
            <Text fontWeight="bold" fontSize="md" lineHeight="1">
              Helvio
            </Text>
          </HStack>

          <HStack spacing={3}>
            <IconButton
              aria-label="Basculer le thème"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              variant="ghost"
              size="sm"
            />
            {!accessToken ? (
              <Button as={RouterLink} to="/login" size="sm" bgGradient="linear(to-r, #6366F1, #22D3EE)" color="white">
                Se connecter
              </Button>
            ) : (
              <Button as={RouterLink} to="/app" size="sm" colorScheme="blue">
                Entrer dans l’app
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
