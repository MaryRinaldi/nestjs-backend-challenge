import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//sottoclasse per collaboratori
@Schema({ _id: false }) // _id: false per non creare un ObjectId per ogni collaboratore
export class Collaborator {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;
}

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true, index: true })
  nome: string;

  @Prop({ required: true })
  descrizione: string;

  @Prop([String])
  linguaggi: string[];

  @Prop([String]) 
  tag: string[];

  @Prop({ required: true, default: 0 })
  numeroDiCommit: number;

  @Prop({ required: true, default: 0 })
  numeroDiStelline: number;

  @Prop({ type: [Collaborator] }) 
  listaCollaboratori: Collaborator[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);