import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-cases';
import { CreateUserRequest } from '../requests/create-user.requests';

@Controller('identity')
export class IdentityController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('users')
  async createUser(@Body() body: CreateUserRequest) {
    return this.createUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });
  }
}