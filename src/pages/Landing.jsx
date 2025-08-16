import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Landing() {
  const { accessToken } = useAuth();
  const ctaHref = accessToken ? "/app" : "/login";
  const ctaLabel = accessToken ? "Entrer dans l’app" : "Se connecter";

  const heroText = useColorModeValue("gray.900", "white");
  const heroSub = useColorModeValue("gray.600", "whiteAlpha.800");
  const chipBg = useColorModeValue("blackAlpha.50", "whiteAlpha.200");
  const chipBorder = useColorModeValue("blackAlpha.200", "whiteAlpha.300");
  const featuresBg = useColorModeValue("gray.50", "gray.900");
  const thinWhite = useColorModeValue("whiteAlpha.900", "whiteAlpha.600"); // bord 1px net

  return (
    <Box as="main">
      {/* ===== HERO (fond blanc) ===== */}
      <Box
        as="section"
        bg={useColorModeValue("white", "gray.800")}
        py={{ base: 12, md: 20 }}
        pb={{ base: 20, md: 36 }} // espace bas -> rien ne chevauche les features
      >
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 10, md: 16 }}>
            {/* LEFT: texte + CTAs */}
            <Stack spacing={6} align="start">
              <Badge
                bg={chipBg}
                border="1px solid"
                borderColor={chipBorder}
                rounded="full"
                px={3}
                py={1}
                fontWeight="medium"
                color={heroText}
              >
                Néo-bank pour la Supply Chain
              </Badge>

              <Heading size={{ base: "xl", md: "2xl" }} lineHeight="1.1" color={heroText}>
                Le{" "}
                <Box
                  as="span"
                  bgGradient="linear(to-r, #6366F1, #22D3EE)"
                  bgClip="text"
                >
                  cockpit néo-bank
                </Box>{" "}
                pour tes factures
              </Heading>

              <Text color={heroSub} fontSize={{ base: "md", md: "lg" }} maxW="2xl">
                Crée, envoie et suis tes factures en temps réel. Un flux clair
                entre <strong>Supplier</strong> et <strong>Buyer</strong> :
                Sent → Under Review → Approved/Rejected → Paid.
              </Text>

              <HStack spacing={3} flexWrap="wrap">
                <Button as={RouterLink} to={ctaHref} size="lg"  bgGradient="linear(to-r, #6366F1, #22D3EE)" color="white">
                  {ctaLabel}
                </Button>
                <Button
                  as={RouterLink}
                  to="/app/invoices"
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                  isDisabled={!accessToken}
                  title={!accessToken ? "Connecte-toi d’abord" : "Voir les factures"}
                >
                  Voir les factures
                </Button>
              </HStack>

              <HStack spacing={4} pt={2} opacity={0.9}>
                <Badge colorScheme="green" variant="subtle">Sécurisé JWT</Badge>
                <Badge colorScheme="purple" variant="subtle">Rôles: Admin / Supplier / Buyer</Badge>
                <Badge colorScheme="blue" variant="subtle">PostgreSQL</Badge>
              </HStack>
            </Stack>

            {/* RIGHT: collage images (assets locaux) */}
            <Box position="relative" minH={{ base: "400px", md: "580px" }}>
              {/* Dashboard (base) */}
              <Box
                position="absolute"
                top={{ base: "6px", md: "16px" }}
                left={{ base: "50%", md: "12%" }}
                transform={{ base: "translateX(-50%)", md: "none" }}
                rounded="2xl"
                overflow="hidden"
                shadow="xl"
                border="1px solid"
                borderColor={thinWhite}   // ✅ liseré 1px collé
                zIndex={2}
                pointerEvents="none"
              >
                <Image
                  src="/assets/helvio_dashboard_mock.svg"
                  alt="Aperçu dashboard Helvio"
                  objectFit="cover"
                  w={{ base: "82vw", sm: "500px" }}
                  maxW="560px"
                />
              </Box>

              {/* Carte à gauche — chevauchement franc sur le coin bas-gauche */}
              <Box
                position="absolute"
                bottom={{ base: "138px", md: "228px" }} // ↑ remonte = chevauche davantage
                left={{ base: "14%", md: "5%" }}       // → pousse vers l’intérieur (à droite)
                transform="rotate(-3.5deg)"
                rounded="2xl"
                overflow="hidden"
                //shadow="lg"
                //border="1px solid"
                //borderColor={thinWhite}   // ✅ liseré 1px collé
                zIndex={3}
                pointerEvents="none"
              >
                <Image
                  src="/assets/helvio_card_glacier.svg"
                  alt="Carte Helvio glacier"
                  objectFit="cover"
                  w={{ base: "182px", sm: "222px" }}
                />
              </Box>

              {/* Téléphone à droite — chevauchement sur le coin bas-droit */}
              <Box
                position="absolute"
                bottom={{ base: "150px", md: "195px" }} // ↑ remonte = chevauche davantage
                right={{ base: "20%", md: "-18%" }}      // ← tire vers l’intérieur (à gauche)
                transform="rotate(10deg)"
                rounded="2xl"
                overflow="hidden"
                //shadow="lg"
                //border="1px solid"
                //borderColor={thinWhite}   // ✅ liseré 1px collé
                zIndex={3}
                pointerEvents="none"
              >
                <Image
                  src="/assets/helvio_phone_mock.svg"
                  alt="Mobile Helvio"
                  objectFit="cover"
                  w={{ base: "175px", sm: "205px" }}
                />
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box as="section" py={{ base: 12, md: 16 }} bg={featuresBg}>
        <Container maxW="6xl">
          <Stack spacing={8}>
            <Heading size="lg">Pourquoi Helvio ?</Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Feature
                title="Création ultra-simple"
                desc="Un supplier peut créer et envoyer sa facture en 30 secondes."
              />
              <Feature
                title="Visibilité par rôle"
                desc="Supplier & Buyer voient leurs propres factures ; Admin voit tout."
              />
              <Feature
                title="Statuts clairs"
                desc="Sent, Under Review, Approved/Rejected, Paid — zéro ambiguïté."
              />
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* CTA FINAL (gradient bleu) */}
      <Box as="section" py={{ base: 12, md: 16 }} bgGradient="linear(to-r, #6366F1, #22D3EE)" >
        <Container maxW="6xl">
          <Stack spacing={6} align="center" textAlign="center">
            <Heading color="white">Prêt à accélérer ta facturation ?</Heading>
            <Text color="whiteAlpha.900" maxW="2xl">
              Rejoins Helvio et passe au cockpit néo-bank de ta Supply Chain.
            </Text>
            <HStack spacing={3}>
              <Button as={RouterLink} to={ctaHref} size="lg" variant="solid" colorScheme="whiteAlpha">
                {ctaLabel}
              </Button>
              <Button
                as={RouterLink}
                to="/app/invoices"
                size="lg"
                variant="outline"
                colorScheme="whiteAlpha"
                isDisabled={!accessToken}
                title={!accessToken ? "Connecte-toi d’abord" : "Voir les factures"}
              >
                Voir les factures
              </Button>
            </HStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

function Feature({ title, desc }) {
  return (
    <Stack
      p={5}
      bg={useColorModeValue("white", "gray.800")}
      rounded="xl"
      border="1px solid"
      borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
      shadow="sm"
      spacing={2}
    >
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue("gray.600", "gray.300")}>{desc}</Text>
    </Stack>
  );
}
