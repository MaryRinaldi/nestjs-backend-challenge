import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('users') // prefisso di route a /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register') // richieste POST a /users/register
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.create(createUserDto);

    const { password, ...result } = user.toObject();
    
    return result;
  }
}