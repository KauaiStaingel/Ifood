'use client'

import { Flex, Text, IconButton } from '@chakra-ui/react'
import { MdNotifications } from 'react-icons/md'
import { Avatar } from '@/components/ui/avatar'
import { ColorModeButton } from '@/components/ui/color-mode'

export function Header() {
  return (
    <Flex
      px={6} py={4}
      bg="app.surface"
      borderBottom="1px solid"
      borderColor="app.border"
      align="center"
      justify="space-between"
    >
      <Text color="app.text.secondary" fontSize="sm">
        Bem-vindo de volta 👋
      </Text>

      <Flex align="center" gap={2}>
        <ColorModeButton />

        <IconButton
          aria-label="Notificações"
          variant="ghost"
          color="app.text.secondary"
        >
          <MdNotifications size={20} />
        </IconButton>

        <Avatar size="sm" name="Usuário" />
      </Flex>
    </Flex>
  )
}