import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Project } from '../../projects/schemas/project.schema';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User; // collegamento con utente

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true })
  project: Project; // riferimento al progetto

  @Prop()
  descrizionePersonale: string; // nota dell'utente perché è interessante
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

// indice di controllo per progetto preferito solo una volta
FavoriteSchema.index({ user: 1, project: 1 }, { unique: true });