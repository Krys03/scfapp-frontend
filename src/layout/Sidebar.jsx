import { Box, VStack, HStack, Text, Link as CLink, useColorModeValue } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/app', label: 'Dashboard' },
  { to: '/app/supplier/invoices/new', label: 'Créer une facture' },
  { to: '/app/invoices', label: 'Factures' },
  { to: '/app/settings', label: 'Paramètres' },
]

export default function Sidebar({ onNavigate }) {
  const { pathname } = useLocation()
  const activeBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.200')
  const hoverBg  = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')
  const border   = useColorModeValue('gray.200', 'whiteAlpha.300')

  return (
    <Box as="nav"
         position="sticky" top="68px"
         w={{ base: 'full', md: 64 }}
         borderRight={{ base: 'none', md: '1px solid' }}
         borderColor={{ base: 'transparent', md: border }}
         py={4}>
      <VStack align="stretch" spacing={1} px={{ base: 2, md: 3 }}>
        {NAV.map(item => {
          const isActive = pathname === item.to
          return (
            <CLink
              key={item.to}
              as={Link}
              to={item.to}
              onClick={onNavigate}
              _hover={{ textDecoration: 'none', bg: hoverBg }}
              bg={isActive ? activeBg : 'transparent'}
              rounded="lg"
              px={3} py={2}
            >
              <HStack spacing={3}>
                <Box boxSize="8px" rounded="full" bg={isActive ? 'brand.500' : 'transparent'} />
                <Text fontWeight={isActive ? 700 : 500}>{item.label}</Text>
              </HStack>
            </CLink>
          )
        })}
      </VStack>
    </Box>
  )
}
