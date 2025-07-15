import { Injectable, Logger, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger(FavoritesService.name);

  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
  ) {}

  async add(createFavoriteDto: CreateFavoriteDto, userId: string): Promise<FavoriteDocument> {
    const { projectId, personalDescription } = createFavoriteDto;
    this.logger.log(`User ${userId} attempting to add project ${projectId} to favorites.`);
    
    try {
      const newFavorite = new this.favoriteModel({
        user: userId,
        project: projectId,
        personalDescription,
      });
      return await newFavorite.save();
    } catch (error) {
        // error legato a indice unique
      if (error.code === 11000) {
        throw new ConflictException('Questo progetto è già nei tuoi preferiti.');
      }
      throw error;
    }
  }

  async findAllForUser(userId: string): Promise<FavoriteDocument[]> {
    this.logger.log(`Fetching all favorites for user ${userId}.`);
    // 'populate' con i dati completi del progetto
    return this.favoriteModel.find({ user: userId }).populate('project').exec();
  }
  
  async remove(favoriteId: string, userId: string): Promise<void> {
    this.logger.log(`User ${userId} attempting to remove favorite ${favoriteId}.`);
    const favorite = await this.favoriteModel.findById(favoriteId);

    if (!favorite) {
      throw new NotFoundException('Preferito non trovato.');
    }

    // utente può cancellare solo i propri preferiti
    if (favorite.user.toString() !== userId) {
      throw new ForbiddenException('Non hai il permesso di rimuovere questo preferito.');
    }
    
    await this.favoriteModel.findByIdAndDelete(favoriteId).exec();
  }
}