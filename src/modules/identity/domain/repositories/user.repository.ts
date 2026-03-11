export interface UserRepository {
  existsByEmail(email: string): Promise<boolean>;

  create(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }>;

  findByEmail(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>;
}


// Por que começar pelo contrato

// Porque o caso de uso não deve depender diretamente do Prisma.

// Ele deve depender de uma abstração.

// Isso permite:

// trocar implementação depois

// testar sem banco real

// separar domínio de infraestrutura

// Essa é uma prática central em arquitetura limpa.