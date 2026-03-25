import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-cases';
import { CreateUserRequest } from '../requests/create-user.requests';
import { LoginUserRequest } from '../requests/login-user.requests';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-cases';
import { Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/security/jwt-auth.guard';
import { CurrentUser } from '../../infrastructure/security/current-user.decorator';
import { AuthenticatedUser } from '../../infrastructure/security/authenticated-user';

@Controller('identity')
export class IdentityController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('users')
  async createUser(@Body() body: CreateUserRequest) {
    return this.createUserUseCase.execute({
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role,
    });
  }

  @Post('login')
  async login(@Body() body: LoginUserRequest) {
    return this.loginUserUseCase.execute({
      email: body.email,
      password: body.password,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthenticatedUser) {
    return user;
}
}