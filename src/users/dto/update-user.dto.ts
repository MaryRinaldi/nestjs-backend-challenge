import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// tutti i campi di CreateUserDto opzionali.
export class UpdateUserDto extends PartialType(CreateUserDto) {}