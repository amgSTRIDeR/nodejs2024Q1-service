import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto.';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

interface User {
  login: string;
  userId: string;
  hash: string;
}

@Injectable()
export class AuthService {
  private saltLevel = process.env.SALT_LEVEL || 10;
  private database: User[] = [];
  private jwtSecretKey = process.env.JWT_SECRET_KEY;
  private jwtSecretRefreshKey = process.env.JWT_SECRET_REFRESH_KEY;
  private tokenExpireTime = process.env.TOKEN_EXPIRE_TIME || '1h';
  private refreshTokenExpireTime =
    process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

  async login(dto: LoginDto) {
    const user = this.database.find((u) => u.login === dto.login);
    if (!user || !bcrypt.compare(dto.password, user.hash)) {
      return {
        message: 'User not found or password is incorrect',
        status: 403,
      };
    }
    const token = this.generateToken(user.login, user.userId);
    const refreshToken = this.generateRefreshToken(user.login, user.userId);

    return { token: token, refreshToken: refreshToken, status: 200 };
  }

  async signup(dto: SignupDto) {
    const hash = await bcrypt.hash(dto.password, this.saltLevel);
    const userId = uuidv4();
    this.database.push({ login: dto.login, hash: hash, userId: userId });
  }

  generateToken(login: string, userId: string) {
    return jwt.sign({ login: login, userId: userId }, this.jwtSecretKey, {
      expiresIn: this.tokenExpireTime,
    });
  }

  generateRefreshToken(login: string, userId: string) {
    return jwt.sign(
      { login: login, userId: userId },
      this.jwtSecretRefreshKey,
      {
        expiresIn: this.refreshTokenExpireTime,
      },
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.jwtSecretKey);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, this.jwtSecretRefreshKey);
  }
}
