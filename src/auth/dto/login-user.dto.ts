import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Il formato dell\'email non è valido.' })
  @IsNotEmpty({ message: 'L\'email non può essere vuota.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La password non può essere vuota.' })
  password: string;
}