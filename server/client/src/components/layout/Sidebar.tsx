'use client'

import { Box, VStack, Text, Icon, Link } from '@chakra-ui/react'
import { MdDashboard, MdPeople, MdSettings } from 'react-icons/md'

const navItems = [
    { label: 'Dashboard', icon: MdDashboard, href: '/dashboard' },
    { label: 'Usuários', icon: MdPeople, href: '/dashboard/users' },
    { label: 'Ajustes', icon: MdSettings, href: '/dashboard/settings' },
]

export function Sidebar() {
    return (
        <Box w="240px" bg="gray.900" h="100vh" p={4} borderRight="1px" borderColor="gray.700">
            <Text fontSize="xl" fontWeight="bold" mb={8} color="brand.500">
                MyApp
            </Text>
            <VStack alignItems="stretch" gap={1}>        {navItems.map((item) => (
                <Link key={item.label} href={item.href} _hover={{ textDecoration: 'none' }}>
                    <Box
                        display="flex" alignItems="center" gap={3}
                        px={3} py={2} borderRadius="md" color="gray.300"
                        _hover={{ bg: 'gray.700', color: 'white' }}
                    >
                        <Icon as={item.icon} boxSize={5} />
                        <Text>{item.label}</Text>
                    </Box>
                </Link>
            ))}
            </VStack>
        </Box>
    )
}