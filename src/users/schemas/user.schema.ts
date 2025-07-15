import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/decorators/roles.decorator';

export type UserDocument = HydratedDocument<User>;

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

  @Prop({ type: String, enum: Role, default: Role.User })
  ruolo: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
