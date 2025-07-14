import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cognome: string;

  @Prop({ required: true, type: Date })
  dataDiNascita: Date;

  @Prop({ required: true })
  cittaDiOrigine: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  ruolo: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
