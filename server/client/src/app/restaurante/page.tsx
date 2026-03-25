'use client'

import { Box, Flex, Text, Heading, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { MdRestaurant, MdAttachMoney, MdStar, MdLogout } from 'react-icons/md'

export default function RestaurantePage() {
  const router = useRouter()

  return (
    <Box bg="black" minH="100vh" p={{ base: 4, md: 8 }} color="white">

      {/* Header */}
      <Flex justify="space-between" align="center" mb={10}>
        <Heading size="xl" fontWeight="black" letterSpacing="tighter">
          <Box as="span" color="orange.500">Compara</Box>Preços
          <Text as="span" fontSize="sm" color="gray.600" fontWeight="normal" ml={3}>
            Painel do restaurante
          </Text>
        </Heading>
        <Box
          as="button" display="flex" alignItems="center" gap={2}
          color="gray.600" fontSize="sm"
          _hover={{ color: 'orange.500' }} transition="color .15s"
          onClick={() => router.push('/login')}
        >
          <MdLogout /> Sair
        </Box>
      </Flex>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }} gap={4} mb={10}>
        {[
          { icon: <MdRestaurant />, label: 'Pedidos hoje',    value: '38' },
          { icon: <MdAttachMoney />, label: 'Faturamento',   value: 'R$ 1.240' },
          { icon: <MdStar />,        label: 'Avaliação',     value: '4.8' },
          { icon: <MdRestaurant />, label: 'Itens no menu',  value: '24' },
        ].map((s, i) => (
          <Box key={i} bg="gray.900" border="1px solid" borderColor="gray.800" borderRadius="xl" p={5}>
            <Text fontSize="xs" color="gray.600" textTransform="uppercase" letterSpacing="wider" mb={2}>{s.label}</Text>
            <Text fontSize="2xl" fontWeight="bold" color="white">{s.value}</Text>
          </Box>
        ))}
      </Grid>

      {/* Placeholder */}
      <Flex
        direction="column" align="center" justify="center"
        border="1px dashed" borderColor="gray.800"
        borderRadius="2xl" py={20} color="gray.700"
      >
        <Text fontSize="4xl" mb={4}>🚧</Text>
        <Text fontWeight="semibold" fontSize="lg">Painel em construção</Text>
        <Text fontSize="sm" mt={2}>Em breve: cardápio, pedidos e relatórios</Text>
      </Flex>
    </Box>
  )
}