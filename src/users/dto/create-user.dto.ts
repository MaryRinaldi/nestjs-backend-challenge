import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Il formato dell\'email non è valido.' })
  @IsNotEmpty({ message: 'L\'email non può essere vuota.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La password non può essere vuota.' })
  @MinLength(8, { message: 'La password deve essere di almeno 8 caratteri.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Il nome non può essere vuoto.' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Il cognome non può essere vuoto.' })
  cognome: string;

  @IsDateString({}, { message: 'La data di nascita deve essere una data valida (es. YYYY-MM-DD).' })
  @IsNotEmpty({ message: 'La data di nascita non può essere vuota.' })
  dataDiNascita: Date;

  @IsString()
  @IsNotEmpty({ message: 'La città di origine non può essere vuota.' })
  cittaDiOrigine: string;
}