import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

interface User {
  login: string;
  hash: string;
}

@Injectable()
export class AuthService {
  private saltLevel = process.env.SALT_LEVEL || 10;
  private database: User[] = [];

  async login(dto: LoginDto) {
    return 'login';
  }

  async signup(dto: SignupDto) {
    const hash = await bcrypt.hash(dto.password, this.saltLevel);
    this.database.push({ login: dto.login, hash: hash });
    console.log(this.database);
  }
}
