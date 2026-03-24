'use client'

// 1. Removido o useColorMode e o Avatar daqui
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { MdNotifications } from 'react-icons/md'

// 2. Importe o Avatar da sua pasta local de snippets (ajuste o caminho se necessário)
import { Avatar } from '@/components/ui/avatar' 

export function Header() {
  return (
    <Flex
      px={6} py={4} bg="gray.900"
      borderBottom="1px" borderColor="gray.700"
      align="center" justify="space-between"
    >
      <Text color="gray.400" fontSize="sm">
        Bem-vindo de volta 👋
      </Text>
      
      <Flex align="center" gap={3}>
        {/* 3. IconButton agora recebe o ícone como children */}
        <IconButton
          aria-label="Notificações"
          variant="ghost"
          color="gray.400"
        >
          <MdNotifications size={20} />
        </IconButton>

        <Avatar size="sm" name="Usuário" bg="brand.500" />
      </Flex>
    </Flex>
  )
}