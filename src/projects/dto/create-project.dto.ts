import { ApiProperty } from '@nestjs/swagger';
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

// DTO per i collaboratori del progetto tech
class CollaboratorDto {
  @ApiProperty({
    example: 'Dr. Elena Rossi',
    description: 'Nome del responsabile AI o del partner tecnologico principale.',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'elena.rossi@neurogrid.ai',
    description: 'Email di contatto del collaboratore.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateProjectDto {
  @ApiProperty({
    example: 'Progetto NeuroLink Nexus "Synapse One"',
    description: 'Il nome ufficiale del progetto ingegneristico tech/AI.',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: 'Una rete neurale distribuita su edge devices, progettata per il controllo predittivo e autonomo di infrastrutture urbane.',
    description: 'Sommario tecnico degli obiettivi e dello scopo del progetto.',
  })
  @IsString()
  @IsNotEmpty()
  descrizione: string;

  @ApiProperty({
    example: ['Ingegneria Informatica', 'Machine Learning', 'Cybersecurity'],
    description: 'Le principali discipline ingegneristiche coinvolte.',
  })
  @IsArray()
  @IsString({ each: true })
  linguaggi: string[];

  @ApiProperty({
    example: ['Edge AI', 'Federated Learning', 'Reti neurali interpretabili', '5G Mesh Network'],
    description: 'Le tecnologie o metodologie chiave utilizzate nel progetto.',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tag?: string[];

  @ApiProperty({
    example: 24,
    description: 'Il numero di milestone o commit tecnologici completati.',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  numeroDiCommit?: number;

  @ApiProperty({
    example: 92,
    description: 'Un indice di innovazione assegnato al progetto, su scala 1–100.',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  numeroDiStelline?: number;

  @ApiProperty({
    type: [CollaboratorDto],
    description: 'I responsabili scientifici, tecnologici o i partner industriali del progetto.',
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CollaboratorDto)
  @IsOptional()
  listaCollaboratori?: CollaboratorDto[];
}
