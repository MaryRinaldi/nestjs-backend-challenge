import { UserDocument } from '../../users/schemas/user.schema';

declare global {
  namespace Express {
    export interface Request {
      user?: UserDocument;
    }
  }
}