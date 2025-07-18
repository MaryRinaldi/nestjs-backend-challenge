import { Controller, Post, Body, Get, Patch, Delete, HttpCode, HttpStatus, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles, Role } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users - Gestione Utenti')
@Controller('users') // prefisso di route a /users
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post('/register') // richieste POST a /users/register
  @ApiOperation({ summary: 'Registra un nuovo ingegnere/utente sulla piattaforma' })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.create(createUserDto);

    const { password, ...result } = user.toObject();
    
    return result;
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt')) //protezione route
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Recupera il profilo dell\'utente autenticato' })
  getProfile(@Req() req: Request) {

    const user = req.user! as UserDocument;
    
    this.logger.log(`Request for profile by user: ${user.email}`);
    const { password, ...userProfile } = user.toObject();
    return userProfile;
  }

  @Patch('/profile')
    @UseGuards(AuthGuard('jwt')) // protezione route
    @ApiBearerAuth()
    async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        // gli utenti possono modificare solo il proprio profilo
        const user = req.user! as UserDocument;
        
        const userId = user._id.toString();
        this.logger.log(`Received request to update profile for user ID: ${userId}`);
        
        const updatedUser = await this.usersService.update(userId, updateUserDto);

        // rimossa password prima di inviare la risposta
        const { password, ...result } = updatedUser.toObject();
        return result;
    }

  @Delete('/profile')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProfile(@Req() req: Request) { 
        
      const user = req.user! as UserDocument;
        
      const userId = user._id.toString();
        this.logger.log(`Received request to delete profile for user ID: ${userId}`);
        await this.usersService.remove(userId);
        return;
    }
// admin GET - protetto - per tutti gli users
 @Get()
  @Roles(Role.Admin) 
  @UseGuards(AuthGuard('jwt'), RolesGuard) 
  @ApiBearerAuth()
  async findAll() {
    this.logger.log('Admin request to find all users');
    const users = await this.usersService.findAll();
    return users.map(user => {
        const { password, ...result } = user.toObject();
        return result;
    });
  }

}