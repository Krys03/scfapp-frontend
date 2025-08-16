import React, { useState } from "react";
import {
  Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel,
  Heading, Input, NumberInput, NumberInputField, Textarea, useToast, Stack
} from "@chakra-ui/react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function SupplierNewInvoice() {
  const toast = useToast();
  const navigate = useNavigate();
  const { accessToken, username } = useAuth();

  const [buyerUsername, setBuyerUsername] = useState("buyer1");
  const [amount, setAmount] = useState(1000);
  const [description, setDescription] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          buyerUsername,
          amount,
          description,
          invoiceNumber: invoiceNumber || undefined,
          // si le backend attend supplier côté serveur depuis l'auth, inutile de l'envoyer
          // supplierUsername: username, 
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }

      toast({ title: "Facture créée", status: "success" });
      navigate("/app/invoices", { replace: true });
    } catch (err) {
      toast({ title: "Échec création", description: err.message, status: "error" });
    }
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Nouvelle facture (Supplier)</Heading>
      </CardHeader>
      <CardBody>
        <Box as="form" onSubmit={onSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Buyer (username)</FormLabel>
              <Input value={buyerUsername} onChange={(e) => setBuyerUsername(e.target.value)} placeholder="buyer1" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Montant</FormLabel>
              <NumberInput min={0} precision={2} value={amount} onChange={(_, v) => setAmount(v ?? 0)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>N° de facture (optionnel)</FormLabel>
              <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="INV-2025-001" />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>

            <Button type="submit" variant="neo" w="fit-content">
              Enregistrer
            </Button>
          </Stack>
        </Box>
      </CardBody>
    </Card>
  );
}
