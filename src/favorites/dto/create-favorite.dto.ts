import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({
    example: '64f45c3ad2b78a7f1e9c1234',
    description: 'ID univoco del progetto AI/Tech da aggiungere ai preferiti.',
  })
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  projectId: string;

  @ApiProperty({
    example: 'Progetto interessante per il modulo di edge AI integrato.',
    description: 'Annotazione personale sul motivo per cui il progetto è stato salvato tra i preferiti.',
    required: false,
  })
  @IsString()
  @IsOptional()
  personalDescription?: string;
}
