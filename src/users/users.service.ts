import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const { email, password, ...rest } = createUserDto;
    // Controllo se un utente con questa email esiste
    this.logger.log(`Attempting to register user with email: ${email}`);
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      this.logger.warn(`Registration failed: email ${email} already exists.`);
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
      const savedUser = await createdUser.save();
      this.logger.log(`User ${savedUser.email} registered successfully with ID: ${savedUser._id}`);
      return savedUser;
    } catch (error) {
      this.logger.error(`Failed to save user ${email}`, error.stack);
      throw new InternalServerErrorException(
        'Si è verificato un errore durante la creazione dell\'utente.',
      );
    }
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    this.logger.log(`Searching for user with email: ${email}`);
    return this.userModel.findOne({ email }).exec();
  }
}