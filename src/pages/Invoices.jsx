import React, { useEffect, useMemo, useState } from "react";
import {
  Box, Heading, Text, Stack, Table, Thead, Tbody, Tr, Th, Td,
  Badge, HStack, Button, Select, Input, useToast, IconButton
} from "@chakra-ui/react";
import { RepeatIcon, SearchIcon } from "@chakra-ui/icons";
import { useAuth } from "../auth/useAuth";

function prettyStatus(s) {
  if (!s) return "—";
  const up = String(s).toUpperCase();
  // mapping facultatif si ton backend renvoie d’autres labels
  const map = {
    SENT: "Sent",
    UNDER_REVIEW: "Under Review",
    APPROVED: "Approved",
    PAID: "Paid",
    REJECTED: "Rejected",
    PENDING: "Pending",
  };
  return map[up] || s;
}

export default function Invoices() {
  const toast = useToast();
  const { accessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [q, setQ] = useState("");

  async function fetchInvoices() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8081/invoices", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setRows(Array.isArray(data) ? data : []);
    } catch (err) {
      toast({ title: "Erreur chargement", description: err.message, status: "error" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusOptions = useMemo(() => {
    const set = new Set(rows.map(r => String(r?.status || "").toUpperCase()).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [rows]);

  const filtered = useMemo(() => {
    return rows.filter(r => {
      const matchesStatus = statusFilter === "ALL" || String(r?.status || "").toUpperCase() === statusFilter;
      const hay = JSON.stringify(r).toLowerCase();
      const matchesQ = !q || hay.includes(q.toLowerCase());
      return matchesStatus && matchesQ;
    });
  }, [rows, statusFilter, q]);

  return (
    <Stack spacing={5}>
      <Heading size="lg">Mes factures</Heading>
      <HStack spacing={3}>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxW="220px"
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt === "ALL" ? "Tous les statuts" : prettyStatus(opt)}</option>
          ))}
        </Select>
        <HStack>
          <Input
            placeholder="Rechercher (buyer, supplier, n°, ...)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            maxW="320px"
          />
          <IconButton aria-label="Rechercher" icon={<SearchIcon />} />
        </HStack>
        <Button
          leftIcon={<RepeatIcon />}
          onClick={fetchInvoices}
          isLoading={loading}
          variant="outline"
        >
          Actualiser
        </Button>
      </HStack>

      <Box overflowX="auto" border="1px solid" borderColor="headerBorder" rounded="lg">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>N°</Th>
              <Th>Supplier</Th>
              <Th>Buyer</Th>
              <Th isNumeric>Montant</Th>
              <Th>Statut</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((r) => (
              <Tr key={r?.id ?? r?.invoiceId ?? Math.random()}>
                <Td>{r?.id ?? "—"}</Td>
                <Td>{r?.invoiceNumber ?? "—"}</Td>
                <Td>{r?.supplier?.username ?? r?.supplierUsername ?? "—"}</Td>
                <Td>{r?.buyer?.username ?? r?.buyerUsername ?? "—"}</Td>
                <Td isNumeric>{r?.amount != null ? Number(r.amount).toLocaleString() : "—"}</Td>
                <Td>
                  <Badge>{prettyStatus(r?.status)}</Badge>
                </Td>
                <Td>{r?.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}</Td>
              </Tr>
            ))}
            {filtered.length === 0 && (
              <Tr>
                <Td colSpan={7}>
                  <Text color="textMuted" py={4} textAlign="center">
                    Aucune facture trouvée avec ce filtre.
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Stack>
  );
}
