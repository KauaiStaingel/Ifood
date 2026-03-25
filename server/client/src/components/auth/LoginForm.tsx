'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Box, Flex, Button, Text, Heading,
    Input, VStack, Grid,
} from '@chakra-ui/react'

type Perfil = 'cliente' | 'dono' | null

export function LoginForm() {
    const router = useRouter()
    const [perfil, setPerfil] = useState<Perfil>(null)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    // ── Mock de credenciais ──────────────────────────────────────────────────────
    const MOCK = {
        cliente: { email: 'cliente@zezs.com', senha: '123456' },
        dono: { email: 'dono@zezs.com', senha: '123456' },
    }

    function handleLogin() {
        if (!perfil) return
        setErro('')
        setLoading(true)

        setTimeout(() => {
            const cred = MOCK[perfil]
            if (email === cred.email && senha === cred.senha) {
                router.push(perfil === 'cliente' ? '/dashboard' : '/restaurante')
            } else {
                setErro('E-mail ou senha incorretos.')
                setLoading(false)
            }
        }, 800)
    }

    // ── Step 1: escolha de perfil ────────────────────────────────────────────────
    if (!perfil) {
        return (
            <Flex minH="100vh" bg="black" align="center" justify="center" p={4}>
                <Box w="100%" maxW="460px">
                    <Logo />

                    <Text
                        fontSize="xs" color="gray.600" textAlign="center"
                        letterSpacing="wider" textTransform="uppercase" mb={4}
                    >
                        Como você quer entrar?
                    </Text>

                    <Grid templateColumns="1fr 1fr" gap={3}>
                        <ProfileCard
                            emoji="🛍️"
                            title="Sou cliente"
                            desc="Quero pedir comida e comparar preços"
                            onClick={() => setPerfil('cliente')}
                        />
                        <ProfileCard
                            emoji="🍽️"
                            title="Sou dono"
                            desc="Quero cadastrar ou gerenciar meu restaurante"
                            onClick={() => setPerfil('dono')}
                        />
                    </Grid>
                </Box>
            </Flex>
        )
    }

    // ── Step 2: formulário de login ──────────────────────────────────────────────
    const isCliente = perfil === 'cliente'

    return (
        <Flex minH="100vh" bg="black" align="center" justify="center" p={4}>
            <Box w="100%" maxW="420px">
                <Logo />

                {/* Voltar */}
                <Box
                    as="button" onClick={() => { setPerfil(null); setErro('') }}
                    display="flex" alignItems="center" gap={2}
                    color="gray.600" fontSize="sm" mb={5}
                    _hover={{ color: 'orange.500' }} transition="color .15s"
                >
                    ← Voltar
                </Box>

                {/* Chip de perfil */}
                <Flex
                    display="inline-flex" align="center" gap={2}
                    bg="orange.950" border="1px solid" borderColor="orange.900"
                    borderRadius="full" px={3} py={1} mb={5}
                >
                    <Box w="6px" h="6px" borderRadius="full" bg="orange.500" />
                    <Text fontSize="xs" color="orange.400" fontWeight="semibold">
                        {isCliente ? 'Cliente' : 'Dono de restaurante'}
                    </Text>
                </Flex>

                {/* Card do formulário */}
                <Box
                    bg="gray.950" border="1px solid" borderColor="gray.800"
                    borderRadius="2xl" p={6}
                >
                    <Text fontWeight="bold" color="white" fontSize="lg" mb={1}>
                        {isCliente ? 'Entre na sua conta' : 'Painel do restaurante'}
                    </Text>
                    <Text color="gray.600" fontSize="sm" mb={6}>
                        {isCliente
                            ? 'Acesse os melhores preços de delivery'
                            : 'Gerencie seu cardápio e pedidos'}
                    </Text>

                    <VStack gap={4}>
                        <Box w="100%">
                            <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={2} letterSpacing="wider" textTransform="uppercase">
                                E-mail
                            </Text>
                            <Input
                                type="email"
                                placeholder={isCliente ? 'cliente@zezs.com' : 'dono@zezs.com'}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                bg="gray.900" border="1px solid" borderColor="gray.800"
                                color="white" _placeholder={{ color: 'gray.700' }}
                                borderRadius="lg" fontSize="sm"
                                _focus={{ borderColor: 'orange.500', boxShadow: 'none', outline: 'none' }}
                            />
                        </Box>

                        <Box w="100%">
                            <Text fontSize="xs" color="gray.500" fontWeight="medium" mb={2} letterSpacing="wider" textTransform="uppercase">
                                Senha
                            </Text>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                                bg="gray.900" border="1px solid" borderColor="gray.800"
                                color="white" _placeholder={{ color: 'gray.700' }}
                                borderRadius="lg" fontSize="sm"
                                _focus={{ borderColor: 'orange.500', boxShadow: 'none', outline: 'none' }}
                            />
                        </Box>

                        {/* Erro */}
                        {erro && (
                            <Box w="100%" bg="red.950" border="1px solid" borderColor="red.900" borderRadius="lg" px={4} py={3}>
                                <Text fontSize="sm" color="red.400">{erro}</Text>
                            </Box>
                        )}

                        {/* Botão */}
                        <Button
                            w="100%"
                            loading={loading}
                            loadingText="Entrando..."
                            bg="orange.500"
                            color="white"
                            borderRadius="xl"
                            py={3}
                            fontWeight="bold"
                            fontSize="sm"
                            _hover={{ bg: 'orange.600' }}
                            transition="background .15s"
                            onClick={handleLogin}
                        >
                            {isCliente ? 'Entrar como cliente' : 'Entrar como restaurante'}
                        </Button>
                    </VStack>

                    {/* Dica mock */}
                    <Box
                        mt={5} bg="gray.900" border="1px solid" borderColor="gray.800"
                        borderRadius="lg" px={4} py={3}
                    >
                        <Text fontSize="xs" color="gray.600" mb={1} fontWeight="semibold">Credenciais de teste</Text>
                        <Text fontSize="xs" color="gray.700">
                            {isCliente ? 'cliente@zezs.com' : 'dono@zezs.com'} · senha: 123456
                        </Text>
                    </Box>

                    <Flex justify="center" mt={5}>
                        <Text fontSize="xs" color="gray.700">
                            Não tem conta?{' '}
                            <Box as="span" color="orange.500" fontWeight="semibold" cursor="pointer">
                                Cadastre-se
                            </Box>
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

// ── Sub-componentes ──────────────────────────────────────────────────────────

function Logo() {
    return (
        <Box textAlign="center" mb={8}>
            <Heading size="3xl" fontWeight="black" letterSpacing="tighter" lineHeight={1}>
                <Box as="span" color="orange.500">Compara</Box>
                <Box as="span" color="white">Preços</Box>
            </Heading>
            <Text color="gray.700" fontSize="xs" mt={1}>de Delivery</Text>
        </Box>
    )
}

function ProfileCard({
    emoji, title, desc, onClick,
}: {
    emoji: string
    title: string
    desc: string
    onClick: () => void
}) {
    const [hovered, setHovered] = useState(false)

    return (
        <Box
            bg={hovered ? '#1a0f00' : 'gray.900'}
            border="1.5px solid"
            borderColor={hovered ? 'orange.500' : 'gray.800'}
            borderRadius="xl" p={5} textAlign="center"
            cursor="pointer" transition="all .15s"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <Text fontSize="3xl" mb={3}>{emoji}</Text>
            <Text fontWeight="bold" color="white" fontSize="sm" mb={2}>{title}</Text>
            <Text color="gray.600" fontSize="xs" lineHeight="1.5">{desc}</Text>
        </Box>
    )
}