import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
      if (!jwtSecret) {
      throw new Error('JWT_SECRET non è definito nel file .env. L\'applicazione non può avviarsi in modo sicuro.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
    this.logger.log('JwtStrategy initialized');
  }

  async validate(payload: { sub: string; email: string; ruolo: string }): Promise<UserDocument> {
    this.logger.debug(`Validating user from JWT payload: ${payload.email}`);
    const user = await this.usersService.findOneByEmail(payload.email);

    if (!user) {
      this.logger.warn(`JWT validation failed: User not found for email ${payload.email}`);
      throw new UnauthorizedException('Token non valido o utente non trovato.');
    }
    
    this.logger.log(`User ${user.email} successfully validated from JWT.`);
    return user;
  }
}