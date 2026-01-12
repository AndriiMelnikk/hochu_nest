import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/database/schemas/user.schema';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<UserDocument>();
  return request;
});
