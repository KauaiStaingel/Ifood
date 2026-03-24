'use client'

import { useState } from 'react'
// Importei o Heading para o título
import { Box, Flex, Text, Grid, VStack, Input, Heading } from '@chakra-ui/react'
import { restaurants, products } from '@/data/mock'

export function RestaurantDashboard() {
  // Estados para controlar a pesquisa e o filtro
  const [busca, setBusca] = useState('')
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas')

  // Pegar todas as categorias únicas dos restaurantes para os botões
  const categorias = ['Todas', ...Array.from(new Set(restaurants.map(r => r.cat)))]

  // Lógica de filtro: verifica o texto digitado e o botão de categoria clicado
  const restaurantesFiltrados = restaurants.filter(rest => {
    const bateComBusca = rest.name.toLowerCase().includes(busca.toLowerCase())
    const bateComCategoria = categoriaSelecionada === 'Todas' || rest.cat === categoriaSelecionada
    return bateComBusca && bateComCategoria
  })

  return (
    // 2. FUNDO AGORA É PRETO PURO
    <Box p={6} bg="black" minH="100vh" color="gray.100">
      
      {/* --- 1. TÍTULO MAIS ESTILIZADO EM PRETO E LARANJA --- */}
      <Heading
        size="2xl"
        fontWeight="extrabold"
        mb={10}
        letterSpacing="tight"
        borderBottom="2px solid"
        borderColor="orange.500" // Linha Laranja embaixo
        display="inline-block"
        pb={1}
      >
        {/* Parte em Laranja */}
        <Text as="span" color="orange.500">
          Zezs
        </Text>
        {/* Parte em Branco/Claro */}
        <Text as="span" color="white">
          Preços
        </Text>
        {/* Parte complementar em cinza claro */}
        <Text as="span" fontWeight="light" color="gray.400" fontSize="lg" ml={2}>
          de Delivery 🍔
        </Text>
      </Heading>

      {/* --- PESQUISA E FILTROS --- */}
      <Flex direction={{ base: "column", md: "row" }} gap={4} mb={8} alignItems="center">
        <Input 
          placeholder="Busque por restaurante..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          bg="gray.900" // Fundo do input um cinza bem escuro para destacar no preto
          border="1px solid" borderColor="gray.700"
          color="white" _placeholder={{ color: 'gray.500' }}
          px={4} py={3} borderRadius="md" flex="1"
          // Mudar a cor da borda ao focar para Laranja
          _focus={{ borderColor: 'orange.500', boxShadow: '0 0 0 1px orange.500' }}
        />
        
        <Flex gap={2} overflowX="auto" pb={{ base: 2, md: 0 }} w={{ base: "100%", md: "auto" }}>
          {categorias.map(cat => (
            <Box
              as="button"
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              px={4} py={2} borderRadius="full" fontSize="sm" fontWeight="bold"
              // 2. CORES DE ACENTO MUDADAS PARA LARANJA
              bg={categoriaSelecionada === cat ? 'orange.500' : 'gray.800'}
              color={categoriaSelecionada === cat ? 'white' : 'gray.400'}
              border="1px solid" borderColor={categoriaSelecionada === cat ? 'orange.500' : 'gray.700'}
              _hover={{ bg: categoriaSelecionada === cat ? 'orange.600' : 'gray.700' }}
              transition="all 0.2s"
              whiteSpace="nowrap"
            >
              {cat}
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* --- SEÇÃO 1: LISTA DE RESTAURANTES (AGORA FILTRADA) --- */}
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Restaurantes ({restaurantesFiltrados.length})
      </Text>
      
      {restaurantesFiltrados.length === 0 ? (
        <Text color="gray.500" mb={12}>Nenhum restaurante encontrado com estes filtros. 😕</Text>
      ) : (
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} mb={12}>
          {restaurantesFiltrados.map((rest) => (
            <Box 
              key={rest.id} p={5} borderWidth="1px" borderColor="gray.700" 
              borderRadius="lg" bg="gray.900" // Cards um cinza bem escuro para destacar no preto
              // 2. BORDAS AO HOVER MUDADAS PARA LARANJA
              _hover={{ borderColor: 'orange.500', transform: 'translateY(-2px)' }}
              transition="all 0.2s" cursor="pointer"
            >
              <Flex justify="space-between" alignItems="center" mb={3}>
                <Text fontSize="lg" fontWeight="bold">{rest.emoji} {rest.name}</Text>
                <Flex alignItems="center" bg="green.900" color="green.300" px={2} py={1} borderRadius="md" fontSize="xs" fontWeight="bold">
                  ★ {rest.rating}
                </Flex>
              </Flex>
              
              <Text color="gray.400" fontSize="sm" mb={4}>
                {rest.cat} • 🛵 {rest.time}
              </Text>
              
              <Flex gap={2}>
                {rest.free && (
                  <Text bg="blue.900" color="blue.300" px={2} py={1} borderRadius="md" fontSize="xs">Entrega Grátis</Text>
                )}
                {rest.promo && (
                  <Text bg="orange.900" color="orange.300" px={2} py={1} borderRadius="md" fontSize="xs">Promoção</Text>
                )}
              </Flex>
            </Box>
          ))}
        </Grid>
      )}

      {/* --- SEÇÃO 2: COMPARADOR DE PREÇOS --- */}
      <Text fontSize="xl" fontWeight="semibold" mb={4}>
        Comparador de Preços 📊
      </Text>
      
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
        {products.map((prod, idx) => (
          <Box key={idx} p={5} borderWidth="1px" borderColor="gray.700" borderRadius="lg" bg="gray.900">
            <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.200">{prod.name}</Text>
            
            <VStack alignItems="stretch" gap={3}>
              {prod.items.map((item, i) => {
                const isCheapest = i === 0 || item.price <= prod.items[0].price;
                return (
                  <Flex 
                    key={i} justify="space-between" alignItems="center"
                    p={3} bg="gray.800" borderRadius="md"
                    // Mantivemos o destaque do mais barato em verde por ser um padrão visual, mas o resto é P&B
                    borderLeftWidth={isCheapest ? "4px" : "0px"}
                    borderColor={isCheapest ? "green.400" : "transparent"}
                  >
                    <Text color="gray.300">{item.rest}</Text>
                    <Text fontWeight="bold" color={isCheapest ? "green.400" : "gray.100"}>
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </Text>
                  </Flex>
                )
              })}
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}