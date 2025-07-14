import { Controller, Post, Body, Get, HttpCode, HttpStatus, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users') // prefisso di route a /users
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post('/register') // richieste POST a /users/register
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.create(createUserDto);

    const { password, ...result } = user.toObject();
    
    return result;
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt')) //protezione route
  getProfile(@Req() req) {
  
    this.logger.log(`Request for profile by user: ${req.user.email}`);
    const { password, ...userProfile } = req.user.toObject();
    return userProfile;
  }
  
}