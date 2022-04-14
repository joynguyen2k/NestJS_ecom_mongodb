import { Body, Controller, Patch, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto){
        return this.usersService.signUp(signUpDto)
    }

    @Post('/signin')
    signIn(@Body() signInDto: SignInDto){
        return this.usersService.signIn(signInDto)

    }
    @Patch('/profile')
    async updateProfile(@GetUser() user: User, @Body() updateProfileDto: UpdateProfileDto){

    }

}
