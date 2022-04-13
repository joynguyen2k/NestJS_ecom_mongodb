import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';

export const GetUser = createParamDecorator(async function GetUser(
  _data,
  context: ExecutionContext,
): Promise<User> {
  const req = await context.switchToHttp().getRequest();
  console.log('user', req.user)
  return req.user;
});