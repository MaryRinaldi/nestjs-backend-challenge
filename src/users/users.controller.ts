import { Controller, Post, Body, Get, Patch, Delete, HttpCode, HttpStatus, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UserDocument } from './schemas/user.schema';

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
  getProfile(@Req() req: Request) {

    const user = req.user!;
    
    this.logger.log(`Request for profile by user: ${user.email}`);
    const { password, ...userProfile } = user.toObject();
    return userProfile;
  }

  @Patch('/profile')
    @UseGuards(AuthGuard('jwt')) // protezione route
    async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        // gli utenti possono modificare solo il proprio profilo
        const user = req.user!;
        
        const userId = user._id.toString();
        this.logger.log(`Received request to update profile for user ID: ${userId}`);
        
        const updatedUser = await this.usersService.update(userId, updateUserDto);

        // rimossa password prima di inviare la risposta
        const { password, ...result } = updatedUser.toObject();
        return result;
    }

  @Delete('/profile')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProfile(@Req() req: Request) { 
        
      const user = req.user!;
        
      const userId = user._id.toString();
        this.logger.log(`Received request to delete profile for user ID: ${userId}`);
        await this.usersService.remove(userId);
        return;
    }

}