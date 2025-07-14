import { UserDocument } from '../../users/schemas/user.schema';

// Dichiariamo a TypeScript che vogliamo aggiungere una proprietà al tipo Request di Express
declare global {
  namespace Express {
    export interface Request {
      // La proprietà user è opzionale (?) e conterrà il nostro UserDocument
      user?: UserDocument;
    }
  }
}