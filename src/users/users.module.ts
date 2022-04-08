import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'joyshop',
      signOptions: {
        expiresIn: '36000',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, PassportModule]
})
export class UsersModule {}
