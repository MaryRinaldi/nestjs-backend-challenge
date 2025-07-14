import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Login attempt for user: ${loginUserDto.email}`);
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      this.logger.warn(`Failed login attempt for email: ${loginUserDto.email} - Invalid credentials`);
      throw new UnauthorizedException('Credenziali non valide.');
    }

    const payload = { email: user.email, sub: user._id, ruolo: user.ruolo };
    this.logger.log(`User ${user.email} logged in successfully. Generating JWT`);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}