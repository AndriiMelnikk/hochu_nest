import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Якщо токен валідний — підставляє `req.user`, інакше пропускає гостя без помилки. */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser>(_err: unknown, user: TUser | false): TUser | null {
    return user || null;
  }
}
