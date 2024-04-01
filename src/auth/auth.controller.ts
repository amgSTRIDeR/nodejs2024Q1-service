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
    const { userId } = await this.authService.signup(dto);
    response.status(201).json({ id: userId });
  }

  @Post('login')
  async login(
    @Body() dto: SignupDto,
    @Res() response: Response,
  ): Promise<void> {
    if (!dto.login || !dto.password) {
      response.status(400).json({ message: 'Login and password are required' });
      return;
    }
    const { token, refreshToken, status } = await this.authService.login(dto);
    response
      .status(status)
      .json({ accessToken: token, refreshToken: refreshToken });
  }
}
