import { forwardRef, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserPayload } from 'src/auth/user-payload.interface';
import { UsersService } from 'src/users/users.service';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {
    super({
      secretOrKey: 'joyshop',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(userPayload: UserPayload) {
    const { username } = userPayload;

    const user = await this.userService.findOne(username);

    return user;
  }
}