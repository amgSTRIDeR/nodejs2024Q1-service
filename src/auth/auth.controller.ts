import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto.';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() dto: SignupDto,
    @Res() response: Response,
  ): Promise<void> {
    if (!dto.login || !dto.password) {
      response.status(400).json({ message: 'Login and password are required' });
      return;
    }
    await this.authService.signup(dto);
    response.status(201).json({ message: 'User created' });
  }
}
