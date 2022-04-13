import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
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

}
