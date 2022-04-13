import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // PassportModule,
    JwtModule.register({
        secret: "joyshop",
        signOptions: { expiresIn: 12*3600 },
    }),
    UsersModule,
    PassportModule
],
providers: [AuthService, JwtStrategy],
controllers: [AuthController],
exports: [AuthService, PassportModule, AuthModule]
})
export class AuthModule {}
