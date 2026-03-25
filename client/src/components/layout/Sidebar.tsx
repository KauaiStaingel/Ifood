'use client'

import { Box, VStack, Text, Icon, Link } from '@chakra-ui/react'
import { MdDashboard, MdPeople, MdSettings } from 'react-icons/md'

const navItems = [
  { label: 'Dashboard', icon: MdDashboard, href: '/dashboard' },
  { label: 'Usuários',  icon: MdPeople,    href: '/dashboard/users' },
  { label: 'Ajustes',   icon: MdSettings,  href: '/dashboard/settings' },
]

export function Sidebar() {
  return (
    <Box
      w="240px" h="100vh" p={4}
      bg="app.surface"
      borderRight="1px solid"
      borderColor="app.border"
    >
      <Text fontSize="xl" fontWeight="black" mb={8} color="orange.500" letterSpacing="tighter">
        ZezsPreços
      </Text>
      <VStack alignItems="stretch" gap={1}>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} _hover={{ textDecoration: 'none' }}>
            <Box
              display="flex" alignItems="center" gap={3}
              px={3} py={2} borderRadius="md"
              color="app.text.secondary"
              _hover={{ bg: 'app.tag.bg', color: 'app.text.primary' }}
              transition="all .15s"
            >
              <Icon as={item.icon} boxSize={5} />
              <Text fontSize="sm">{item.label}</Text>
            </Box>
          </Link>
        ))}
      </VStack>
    </Box>
  )
}