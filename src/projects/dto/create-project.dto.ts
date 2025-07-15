import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsEmail,
} from 'class-validator';

// DTO per il sotto-documento, per la validazione
class CollaboratorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descrizione: string;

  @IsArray()
  @IsString({ each: true })
  linguaggi: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tag?: string[];

  @IsNumber()
  @IsOptional()
  numeroDiCommit?: number;

  @IsNumber()
  @IsOptional()
  numeroDiStelline?: number;

  @IsArray()
  @ValidateNested({ each: true }) 
  @Type(() => CollaboratorDto) 
  @IsOptional()
  listaCollaboratori?: CollaboratorDto[];
}