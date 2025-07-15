import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req, Logger, HttpCode, HttpStatus } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

@Controller('favorites')
@UseGuards(AuthGuard('jwt')) // routes protette
export class FavoritesController {
  private readonly logger = new Logger(FavoritesController.name);

  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  add(@Body() createFavoriteDto: CreateFavoriteDto, @Req() req: Request) {
    const user = req.user! as UserDocument
    const userId = user._id.toString();
    return this.favoritesService.add(createFavoriteDto, userId);
  }

  @Get()
  findAllForUser(@Req() req: Request) {
    const user = req.user! as UserDocument
    const userId = user._id.toString();
    return this.favoritesService.findAllForUser(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user! as UserDocument
    const userId = user._id.toString();
    return this.favoritesService.remove(id, userId);
  }
}