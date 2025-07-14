import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, password, ...rest } = createUserDto;
    // Controllo se un utente con questa email esiste
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Un utente con questa email esiste già.');
    }
    //  Hash della password
    const salt = await bcrypt.genSalt(16); 
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
      ...rest,
    });

    try {
      return await createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException(
        'Si è verificato un errore durante la creazione dell\'utente.',
      );
    }
  }
}