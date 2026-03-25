'use client'

import { useState } from 'react'
import {
  Box, Flex, Text, Grid, VStack,
  Input, Heading, Badge, Separator,
} from '@chakra-ui/react'
import { MdSearch, MdLocalShipping, MdStar, MdTimer, MdStorefront } from 'react-icons/md'
import { restaurants, products } from '@/data/mock'

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub }: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <Box
      bg="gray.900" border="1px solid" borderColor="gray.800"
      borderRadius="xl" p={5} position="relative" overflow="hidden"
    >
      <Box
        position="absolute" top={3} right={3}
        color="orange.500" opacity={0.2} fontSize="4xl"
      >
        {icon}
      </Box>
      <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={1} textTransform="uppercase" letterSpacing="wider">
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color="white" lineHeight={1.2}>
        {value}
      </Text>
      <Text fontSize="xs" color="gray.500" mt={1}>{sub}</Text>
    </Box>
  )
}

// ─── Restaurant Card ───────────────────────────────────────────────────────────
function RestaurantCard({ rest }: { rest: typeof restaurants[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Box
      bg="gray.900" border="1px solid"
      borderColor={hovered ? 'orange.500' : 'gray.800'}
      borderRadius="xl" overflow="hidden" cursor="pointer"
      transform={hovered ? 'translateY(-3px)' : 'translateY(0)'}
      transition="all 0.2s ease"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumb */}
      <Flex
        h="100px" align="center" justify="center" fontSize="4xl"
        bg={hovered ? 'orange.950' : 'gray.800'}
        transition="background 0.2s"
        position="relative"
      >
        {rest.emoji}
        {rest.promo && (
          <Badge
            position="absolute" top={2} right={2}
            bg="orange.500" color="white"
            fontSize="9px" fontWeight="bold"
            px={2} py={1} borderRadius="md"
          >
            PROMOÇÃO
          </Badge>
        )}
      </Flex>

      {/* Body */}
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold" color="white" fontSize="md" truncate>
            {rest.name}
          </Text>
          <Flex align="center" gap={1} bg="gray.800" px={2} py={1} borderRadius="md">
            <Box color="yellow.400" fontSize="xs"><MdStar /></Box>
            <Text fontSize="xs" fontWeight="bold" color="yellow.400">{rest.rating}</Text>
          </Flex>
        </Flex>

        <Text color="gray.500" fontSize="xs" mb={3}>{rest.cat}</Text>

        <Separator borderColor="gray.800" mb={3} />

        <Flex justify="space-between" align="center">
          <Flex align="center" gap={1} color="gray.400" fontSize="xs">
            <MdTimer />
            <Text>{rest.time}</Text>
          </Flex>
          <Flex align="center" gap={1} fontSize="xs">
            <MdLocalShipping />
            <Text color={rest.free ? 'green.400' : 'gray.400'} fontWeight={rest.free ? 'bold' : 'normal'}>
              {rest.free ? 'Grátis' : `R$ ${rest.deliveryFee?.toFixed(2)}`}
            </Text>
          </Flex>
        </Flex>

        {rest.minOrder && (
          <Text fontSize="10px" color="gray.600" mt={2}>
            Pedido mínimo: R$ {rest.minOrder.toFixed(2)}
          </Text>
        )}
      </Box>
    </Box>
  )
}

// ─── Price Comparison Card ─────────────────────────────────────────────────────
function PriceCard({ prod }: { prod: typeof products[0] }) {
  const sorted = [...prod.items].sort((a, b) => a.price - b.price)
  const minPrice = sorted[0].price
  const maxPrice = sorted[sorted.length - 1].price
  const diff = maxPrice - minPrice

  return (
    <Box bg="gray.900" border="1px solid" borderColor="gray.800" borderRadius="xl" p={5}>
      <Flex align="center" gap={2} mb={4}>
        <Text fontSize="xl">{prod.emoji}</Text>
        <Text fontWeight="bold" color="white" fontSize="md">{prod.name}</Text>
        <Badge ml="auto" bg="gray.800" color="gray.400" fontSize="10px" px={2} py={1} borderRadius="md">
          economia até R$ {diff.toFixed(2)}
        </Badge>
      </Flex>

      <VStack gap={2} align="stretch">
        {sorted.map((item, i) => {
          const isBest = item.price === minPrice
          const pct = Math.round(((item.price - minPrice) / minPrice) * 100)

          return (
            <Flex
              key={i}
              align="center" justify="space-between"
              p={3} borderRadius="lg"
              bg={isBest ? 'green.950' : 'gray.800'}
              border="1px solid"
              borderColor={isBest ? 'green.800' : 'gray.700'}
            >
              <Flex align="center" gap={3}>
                {/* barra de ranking */}
                <Box
                  w="3px" h="32px" borderRadius="full"
                  bg={i === 0 ? 'green.400' : i === 1 ? 'orange.400' : 'gray.600'}
                />
                <Box>
                  <Text fontSize="sm" color={isBest ? 'green.200' : 'gray.300'} fontWeight="medium">
                    {item.rest}
                  </Text>
                  {isBest
                    ? <Text fontSize="10px" color="green.500">Melhor preço ✓</Text>
                    : <Text fontSize="10px" color="gray.500">+{pct}% mais caro</Text>
                  }
                </Box>
              </Flex>

              <Text
                fontWeight="bold" fontSize="lg"
                color={isBest ? 'green.400' : 'gray.200'}
              >
                R$ {item.price.toFixed(2).replace('.', ',')}
              </Text>
            </Flex>
          )
        })}
      </VStack>
    </Box>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export function RestaurantDashboard() {
  const [busca, setBusca] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas')

  const categorias = ['Todas', ...Array.from(new Set(restaurants.map(r => r.cat)))]

  const restaurantesFiltrados = restaurants.filter(rest => {
    const bateComBusca = rest.name.toLowerCase().includes(busca.toLowerCase())
    const bateComCategoria = categoriaSelecionada === 'Todas' || rest.cat === categoriaSelecionada
    return bateComBusca && bateComCategoria
  })

  const totalGratis = restaurants.filter(r => r.free).length
  const mediaRating = (restaurants.reduce((acc, r) => acc + r.rating, 0) / restaurants.length).toFixed(1)
  const tempoMedio = '32min'

  return (
    <Box p={{ base: 4, md: 8 }} bg="black" minH="100vh" color="gray.100">

      {/* ── Header / Logo ── */}
      <Flex align="baseline" gap={2} mb={8}>
        <Heading
          size="3xl" fontWeight="black" letterSpacing="tighter"
          lineHeight={1}
        >
          <Text as="span" color="orange.500">Zezs</Text>
          <Text as="span" color="white">Preços</Text>
        </Heading>
        <Text color="gray.600" fontSize="sm" fontWeight="normal">de Delivery</Text>
      </Flex>

      {/* ── Stats ── */}
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={4} mb={10}
      >
        <StatCard icon={<MdStorefront />}    label="Restaurantes"     value={String(restaurants.length)} sub="na sua região" />
        <StatCard icon={<MdStar />}          label="Avaliação média"  value={mediaRating}                sub="últimos 30 dias" />
        <StatCard icon={<MdLocalShipping />} label="Entrega grátis"   value={String(totalGratis)}        sub="disponíveis agora" />
        <StatCard icon={<MdTimer />}         label="Tempo médio"      value={tempoMedio}                 sub="estimativa atual" />
      </Grid>

      {/* ── Search & Filters ── */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={3} mb={6} align="center">
        <Box position="relative" flex={1} w="100%">
          <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.500" pointerEvents="none">
            <MdSearch size={18} />
          </Box>
          <Input
            pl={9} placeholder="Busque por restaurante ou categoria..."
            value={busca} onChange={(e) => setBusca(e.target.value)}
            bg="gray.900" border="1px solid" borderColor="gray.800"
            color="white" _placeholder={{ color: 'gray.600' }}
            borderRadius="xl" fontSize="sm"
            _focus={{ borderColor: 'orange.500', outline: 'none', boxShadow: 'none' }}
          />
        </Box>

        <Flex gap={2} flexWrap="wrap">
          {categorias.map(cat => (
            <Box
              as="button" key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              px={4} py={2} borderRadius="full" fontSize="sm" fontWeight="semibold"
              bg={categoriaSelecionada === cat ? 'orange.500' : 'gray.900'}
              color={categoriaSelecionada === cat ? 'white' : 'gray.500'}
              border="1px solid"
              borderColor={categoriaSelecionada === cat ? 'orange.500' : 'gray.800'}
              _hover={{ borderColor: 'orange.500', color: 'orange.400' }}
              transition="all 0.15s"
              whiteSpace="nowrap"
            >
              {cat}
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* ── Restaurants ── */}
      <Flex align="center" gap={2} mb={4}>
        <Text fontSize="xs" color="gray.600" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
          Restaurantes
        </Text>
        <Box flex={1} h="1px" bg="gray.900" />
        <Text fontSize="xs" color="gray.600">{restaurantesFiltrados.length} encontrados</Text>
      </Flex>

      {restaurantesFiltrados.length === 0 ? (
        <Flex direction="column" align="center" justify="center" py={16} color="gray.700">
          <Text fontSize="4xl" mb={3}>🍽️</Text>
          <Text fontWeight="semibold">Nenhum restaurante encontrado</Text>
          <Text fontSize="sm" mt={1}>Tente outro termo ou categoria</Text>
        </Flex>
      ) : (
        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={5} mb={12}
        >
          {restaurantesFiltrados.map(rest => (
            <RestaurantCard key={rest.id} rest={rest} />
          ))}
        </Grid>
      )}

      {/* ── Price Comparator ── */}
      <Flex align="center" gap={2} mb={6}>
        <Text fontSize="xs" color="gray.600" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
          Comparador de preços
        </Text>
        <Box flex={1} h="1px" bg="gray.900" />
        <Text fontSize="xs" color="gray.600">{products.length} produtos</Text>
      </Flex>

      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={5}
      >
        {products.map((prod, idx) => (
          <PriceCard key={idx} prod={prod} />
        ))}
      </Grid>

      {/* ── Footer ── */}
      <Flex justify="center" mt={16} mb={4}>
        <Text fontSize="xs" color="gray.800">
          ZezsPreços • dados simulados para fins de demonstração
        </Text>
      </Flex>

    </Box>
  )
}