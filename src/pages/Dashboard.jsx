import {
    Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText,
    Card, CardHeader, CardBody, Heading, HStack, Tag, TagLabel, Text, Stack, Button
  } from '@chakra-ui/react'
  import { useEffect, useState } from 'react'
  import { apiFetch } from '../api/client'
  import { useAuth } from '../auth/useAuth'
  
  function StatCard({ label, value, hint }) {
    return (
      <Card>
        <CardBody>
          <Stat>
            <StatLabel>{label}</StatLabel>
            <StatNumber>{value}</StatNumber>
            {hint && <StatHelpText>{hint}</StatHelpText>}
          </Stat>
        </CardBody>
      </Card>
    )
  }
  
  export default function Dashboard() {
    const { accessToken } = useAuth()
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      let mounted = true
      async function load() {
        try {
          const data = await apiFetch('/invoices', { token: accessToken })
          if (mounted) setInvoices(Array.isArray(data) ? data.slice(0, 7) : [])
        } catch {
          if (mounted) setInvoices([])
        } finally {
          if (mounted) setLoading(false)
        }
      }
      if (accessToken) load(); else setLoading(false)
      return () => { mounted = false }
    }, [accessToken])
  
    const total = invoices.length
    const approved = invoices.filter(i => i.status === 'APPROVED').length
    const under = invoices.filter(i => i.status === 'UNDER_REVIEW').length
  
    return (
      <Box>
        <Heading size="lg" mb={4}>Vue d’ensemble</Heading>
  
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
          <StatCard label="Factures récentes" value={total} hint="7 dernières" />
          <StatCard label="Approuvées" value={approved} />
          <StatCard label="En revue" value={under} />
        </SimpleGrid>
  
        <Card>
          <CardHeader>
            <HStack justify="space-between">
              <Heading size="md">Dernières factures</Heading>
              <Button size="sm" variant="neo">Nouvelle facture</Button>
            </HStack>
          </CardHeader>
          <CardBody>
            <Stack spacing={3}>
              {loading ? (
                <Text>Chargement…</Text>
              ) : invoices.length === 0 ? (
                <Text>Aucune facture récente.</Text>
              ) : (
                invoices.map(inv => (
                  <Box key={inv.id} display="grid" gridTemplateColumns="1fr 1fr auto" gap={2}
                       p={3} borderWidth="1px" rounded="lg">
                    <Box>
                      <Text fontWeight="bold">#{inv.id}</Text>
                      <Text fontSize="sm" opacity={0.8}>{inv.description || '—'}</Text>
                    </Box>
                    <Box>
                      <Text>Montant: <b>{inv.amount ?? '—'}</b></Text>
                      <Text fontSize="sm" opacity={0.8}>
                        Émetteur: {inv.supplier?.username ?? inv.supplierName ?? '—'}
                      </Text>
                    </Box>
                    <HStack justify="flex-end">
                      {inv.status === 'SENT' && <Tag variant="sent"><TagLabel>Sent</TagLabel></Tag>}
                      {inv.status === 'UNDER_REVIEW' && <Tag variant="underReview"><TagLabel>Under review</TagLabel></Tag>}
                      {inv.status === 'APPROVED' && <Tag variant="approved"><TagLabel>Approved</TagLabel></Tag>}
                      {inv.status === 'REJECTED' && <Tag variant="rejected"><TagLabel>Rejected</TagLabel></Tag>}
                      {inv.status === 'PAID' && <Tag variant="paid"><TagLabel>Paid</TagLabel></Tag>}
                    </HStack>
                  </Box>
                ))
              )}
            </Stack>
          </CardBody>
        </Card>
      </Box>
    )
  }
  