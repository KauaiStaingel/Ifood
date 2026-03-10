export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
}


// Papel desse DTO

// Esse DTO é interno da aplicação.

// Ele representa os dados que o caso de uso precisa para executar.

// Ele não é DTO HTTP.
// Isso é importante.