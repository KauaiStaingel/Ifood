'use client'

import { useState } from 'react'
import {
  Box, Flex, Text, Grid, VStack,
  Input, Heading, Badge, Separator,
} from '@chakra-ui/react'
import { 
  MdSearch, MdLocalShipping, MdStar, 
  MdTimer, MdStorefront, MdLogout 
} from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { restaurants, products } from '@/data/mock'

// --- Subcomponentes ---

function StatCard({ icon, label, value, sub }: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <Box
      bg="app.card" border="1px solid" borderColor="app.border"
      borderRadius="xl" p={5} position="relative" overflow="hidden"
    >
      <Box position="absolute" top={3} right={3} color="orange.500" opacity={0.15} fontSize="4xl">
        {icon}
      </Box>
      <Text fontSize="xs" color="app.text.muted" fontWeight="medium" mb={1}
        textTransform="uppercase" letterSpacing="wider">
        {label}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" color="app.text.primary" lineHeight={1.2}>
        {value}
      </Text>
      <Text fontSize="xs" color="app.text.muted" mt={1}>{sub}</Text>
    </Box>
  )
}

function RestaurantCard({ rest }: { rest: typeof restaurants[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Box
      bg="app.card" border="1px solid"
      borderColor={hovered ? 'orange.500' : 'app.border'}
      borderRadius="xl" overflow="hidden" cursor="pointer"
      transform={hovered ? 'translateY(-3px)' : 'translateY(0)'}
      transition="all 0.2s ease"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Flex
        h="100px" align="center" justify="center" fontSize="4xl"
        bg={hovered ? 'app.tag.bg' : 'app.surface'}
        transition="background 0.2s" position="relative"
      >
        {rest.emoji}
        {rest.promo && (
          <Badge
            position="absolute" top={2} right={2}
            bg="app.badge.promo.bg" color="app.badge.promo.color"
            fontSize="9px" fontWeight="bold" px={2} py={1} borderRadius="md"
          >
            PROMOÇÃO
          </Badge>
        )}
      </Flex>

      <Box p={4}>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold" color="app.text.primary" fontSize="md" truncate>
            {rest.name}
          </Text>
          <Flex align="center" gap={1} bg="app.surface" px={2} py={1} borderRadius="md">
            <Box color="yellow.400" fontSize="xs"><MdStar /></Box>
            <Text fontSize="xs" fontWeight="bold" color="yellow.400">{rest.rating}</Text>
          </Flex>
        </Flex>

        <Text color="app.text.muted" fontSize="xs" mb={3}>{rest.cat}</Text>

        <Separator borderColor="app.border" mb={3} />

        <Flex justify="space-between" align="center">
          <Flex align="center" gap={1} color="app.text.secondary" fontSize="xs">
            <MdTimer />
            <Text>{rest.time}</Text>
          </Flex>
          <Flex align="center" gap={1} fontSize="xs">
            <MdLocalShipping />
            <Text
              color={rest.free ? 'green.500' : 'app.text.secondary'}
              fontWeight={rest.free ? 'bold' : 'normal'}
            >
              {rest.free ? 'Grátis' : `R$ ${rest.deliveryFee?.toFixed(2)}`}
            </Text>
          </Flex>
        </Flex>

        {rest.minOrder && (
          <Text fontSize="10px" color="app.text.muted" mt={2}>
            Pedido mínimo: R$ {rest.minOrder.toFixed(2)}
          </Text>
        )}
      </Box>
    </Box>
  )
}

function PriceCard({ prod }: { prod: typeof products[0] }) {
  const sorted = [...prod.items].sort((a, b) => a.price - b.price)
  const minPrice = sorted[0].price
  const maxPrice = sorted[sorted.length - 1].price

  return (
    <Box bg="app.card" border="1px solid" borderColor="app.border" borderRadius="xl" p={5}>
      <Flex align="center" gap={2} mb={4}>
        <Text fontSize="xl">{prod.emoji}</Text>
        <Text fontWeight="bold" color="app.text.primary" fontSize="md">{prod.name}</Text>
        <Badge ml="auto" bg="app.surface" color="app.text.secondary"
          fontSize="10px" px={2} py={1} borderRadius="md">
          economia até R$ {(maxPrice - minPrice).toFixed(2)}
        </Badge>
      </Flex>

      <VStack gap={2} align="stretch">
        {sorted.map((item, i) => {
          const isBest = item.price === minPrice
          const pct = Math.round(((item.price - minPrice) / minPrice) * 100)
          return (
            <Flex
              key={i} align="center" justify="space-between"
              p={3} borderRadius="lg"
              bg={isBest ? 'app.badge.free.bg' : 'app.surface'}
              border="1px solid"
              borderColor={isBest ? 'app.badge.free.color' : 'app.border'}
            >
              <Flex align="center" gap={3}>
                <Box
                  w="3px" h="32px" borderRadius="full"
                  bg={i === 0 ? 'green.500' : i === 1 ? 'orange.400' : 'app.border'}
                />
                <Box>
                  <Text fontSize="sm" color={isBest ? 'app.badge.free.color' : 'app.text.primary'} fontWeight="medium">
                    {item.rest}
                  </Text>
                  {isBest
                    ? <Text fontSize="10px" color="green.500">Melhor preço ✓</Text>
                    : <Text fontSize="10px" color="app.text.muted">+{pct}% mais caro</Text>
                  }
                </Box>
              </Flex>
              <Text fontWeight="bold" fontSize="lg"
                color={isBest ? 'green.500' : 'app.text.primary'}>
                R$ {item.price.toFixed(2).replace('.', ',')}
              </Text>
            </Flex>
          )
        })}
      </VStack>
    </Box>
  )
}

// --- Componente Principal ---

export function RestaurantDashboard() {
  const router = useRouter()
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

  return (
    <Box p={{ base: 4, md: 8 }} bg="app.bg" minH="100vh">

      {/* Header com Botão de Sair */}
      <Flex justify="space-between" align="center" mb={8}>
        <Flex align="baseline" gap={2}>
          <Heading size="3xl" fontWeight="black" letterSpacing="tighter" lineHeight={1}>
            <Box as="span" color="orange.500">Zezs</Box>
            <Box as="span" color="app.text.primary">Preços</Box>
          </Heading>
          <Text color="app.text.muted" fontSize="sm">de Delivery</Text>
        </Flex>

        <Box
          as="button"
          display="flex"
          alignItems="center"
          gap={2}
          color="app.text.muted"
          fontSize="sm"
          fontWeight="medium"
          _hover={{ color: 'orange.500' }}
          transition="color .15s"
          onClick={() => router.push('/login')}
        >
          <MdLogout /> Sair
        </Box>
      </Flex>

      {/* Grid de Estatísticas */}
      <Grid templateColumns={{ base: 'repeat(2,1fr)', md: 'repeat(4,1fr)' }} gap={4} mb={10}>
        <StatCard icon={<MdStorefront />} label="Restaurantes" value={String(restaurants.length)} sub="na sua região" />
        <StatCard icon={<MdStar />} label="Avaliação média" value={mediaRating} sub="últimos 30 dias" />
        <StatCard icon={<MdLocalShipping />} label="Entrega grátis" value={String(totalGratis)} sub="disponíveis agora" />
        <StatCard icon={<MdTimer />} label="Tempo médio" value="32min" sub="estimativa atual" />
      </Grid>

      {/* Filtros e Busca */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={3} mb={6} align="center">
        <Box position="relative" flex={1} w="100%">
          <Box position="absolute" left={3} top="50%" transform="translateY(-50%)"
            color="app.text.muted" pointerEvents="none">
            <MdSearch size={18} />
          </Box>
          <Input
            pl={9} placeholder="Busque por restaurante ou categoria..."
            value={busca} onChange={e => setBusca(e.target.value)}
            bg="app.input.bg" border="1px solid" borderColor="app.input.border"
            color="app.text.primary" _placeholder={{ color: 'app.text.muted' }}
            borderRadius="xl" fontSize="sm"
            _focus={{ borderColor: 'orange.500', boxShadow: 'none', outline: 'none' }}
          />
        </Box>
        <Flex gap={2} flexWrap="wrap">
          {categorias.map(cat => (
            <Box
              as="button" key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              px={4} py={2} borderRadius="full" fontSize="sm" fontWeight="semibold"
              bg={categoriaSelecionada === cat ? 'app.tag.active.bg' : 'app.tag.bg'}
              color={categoriaSelecionada === cat ? 'white' : 'app.text.secondary'}
              border="1px solid"
              borderColor={categoriaSelecionada === cat ? 'orange.500' : 'app.border'}
              _hover={{ borderColor: 'orange.500', color: categoriaSelecionada === cat ? 'white' : 'orange.500' }}
              transition="all .15s" whiteSpace="nowrap"
            >
              {cat}
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Listagem de Restaurantes */}
      <Flex align="center" gap={2} mb={4}>
        <Text fontSize="xs" color="app.text.muted" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
          Restaurantes
        </Text>
        <Box flex={1} h="1px" bg="app.border" />
        <Text fontSize="xs" color="app.text.muted">{restaurantesFiltrados.length} encontrados</Text>
      </Flex>

      {restaurantesFiltrados.length === 0 ? (
        <Flex direction="column" align="center" justify="center" py={16} color="app.text.muted">
          <Text fontSize="4xl" mb={3}>🍽️</Text>
          <Text fontWeight="semibold">Nenhum restaurante encontrado</Text>
          <Text fontSize="sm" mt={1}>Tente outro termo ou categoria</Text>
        </Flex>
      ) : (
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }} gap={5} mb={12}>
          {restaurantesFiltrados.map(rest => <RestaurantCard key={rest.id} rest={rest} />)}
        </Grid>
      )}

      {/* Comparador de Preços */}
      <Flex align="center" gap={2} mb={6}>
        <Text fontSize="xs" color="app.text.muted" fontWeight="medium" textTransform="uppercase" letterSpacing="wider">
          Comparador de preços
        </Text>
        <Box flex={1} h="1px" bg="app.border" />
        <Text fontSize="xs" color="app.text.muted">{products.length} produtos</Text>
      </Flex>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2,1fr)' }} gap={5}>
        {products.map((prod, idx) => <PriceCard key={idx} prod={prod} />)}
      </Grid>

      {/* Rodapé */}
      <Flex justify="center" mt={16} mb={4}>
        <Text fontSize="xs" color="app.text.muted">
          ZezsPreços · dados simulados para fins de demonstração
        </Text>
      </Flex>
    </Box>
  )
}