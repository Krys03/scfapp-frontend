import React from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const muted = useColorModeValue("gray.600", "gray.400");

  return (
    <Box as="footer" bg={bg} borderTop="1px solid" borderColor={border} mt={16}>
      <Container maxW="6xl" py={{ base: 8, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr 1fr" }} gap={8}>
          <GridItem>
            <Heading size="sm" mb={3}>Helvio</Heading>
            <Text fontSize="sm" color={muted}>
              Le cockpit néo-bank de la Supply Chain. Crée, envoie, suis tes factures.
            </Text>
          </GridItem>

          <GridItem>
            <Heading size="sm" mb={3}>Produit</Heading>
            <Stack fontSize="sm" spacing={2}>
              <Link as={RouterLink} to="/">Accueil</Link>
              <Link as={RouterLink} to="/login">Se connecter</Link>
              <Link as={RouterLink} to="/app/invoices">Factures</Link>
            </Stack>
          </GridItem>

          <GridItem>
            <Heading size="sm" mb={3}>Ressources</Heading>
            <Stack fontSize="sm" spacing={2}>
              <Link href="#">Sécurité</Link>
              <Link href="#">API</Link>
              <Link href="#">Aide</Link>
            </Stack>
          </GridItem>

          <GridItem>
            <Heading size="sm" mb={3}>Légal</Heading>
            <Stack fontSize="sm" spacing={2}>
              <Link href="#">Conditions</Link>
              <Link href="#">Confidentialité</Link>
              <Link href="#">Cookies</Link>
            </Stack>
          </GridItem>
        </Grid>

        <Box mt={8} pt={6} borderTop="1px solid" borderColor={border}>
          <Text fontSize="sm" color={muted}>© {new Date().getFullYear()} Helvio. Tous droits réservés.</Text>
        </Box>
      </Container>
    </Box>
  );
}
