import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId() 
  projectId: string;

  @IsString()
  @IsOptional()
  personalDescription?: string;
}