import React from "react";
import { Heading, Text, Stack, Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Stack spacing={5}>
      <Heading size="lg">Accueil</Heading>
      <Text color="textMuted">
        Bienvenue dans Helvio. Accède rapidement à ce dont tu as besoin.
      </Text>
      <HStack spacing={3}>
        <Button as={Link} to="/app/invoices" variant="outline">Mes factures</Button>
        <Button as={Link} to="/app/supplier/invoices/new" variant="neo">Créer une facture</Button>
      </HStack>
    </Stack>
  );
}
