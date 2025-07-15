import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
  example: 'mario.rossi@engineer.pro',
  description: "L'email professionale dell'ingegnere/utente.",
  })
  @IsEmail({}, { message: 'Il formato dell\'email non è valido.' })
  @IsNotEmpty({ message: 'L\'email non può essere vuota.' })
  email: string;

  @ApiProperty({
  example: 'Str0ngP@ssw0rd!',
  description: 'Password di almeno 8 caratteri per la sicurezza dell\'account.',
  minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'La password non può essere vuota.' })
  @MinLength(8, { message: 'La password deve essere di almeno 8 caratteri.' })
  password: string;

  @ApiProperty({ example: 'Mario' })
  @IsString()
  @IsNotEmpty({ message: 'Il nome non può essere vuoto.' })
  nome: string;

  @ApiProperty({ example: 'Rossi' })
  @IsString()
  @IsNotEmpty({ message: 'Il cognome non può essere vuoto.' })
  cognome: string;

  @ApiProperty({
  example: '1985-05-15',
  description: 'Data di nascita in formato YYYY-MM-DD.',
  })
  @IsDateString({}, { message: 'La data di nascita deve essere una data valida (es. YYYY-MM-DD).' })
  @IsNotEmpty({ message: 'La data di nascita non può essere vuota.' })
  dataDiNascita: string;

  @ApiProperty({ example: 'Torino' })
  @IsString()
  @IsNotEmpty({ message: 'La città di origine non può essere vuota.' })
  cittaDiOrigine: string;
}