import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  SignUpDto } from './dto/sign-up.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import { SignInDto } from './dto/sign-in.dto';
import { UserPayload } from '../auth/user-payload.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private model: Model<UserDocument>,
        private jwtService: JwtService

        // @InjectRepository(UserRepository)
        // private userRepository: UserRepository
    ){}
    async findOne(id: string): Promise<User>{
        const user = await this.model.findById(id);
        if (!user) {
          throw new UnauthorizedException();
        }
    
        return user;
    }

    async signUp(signUpDto: SignUpDto): Promise<User>{
        console.log('1')
        const {username, password, phone} = signUpDto;
        const currentDate = moment().format();
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)//, salt);
        // console.log('salt', salt);
        console.log('hashedPassword', hashedPassword);
        const user = await this.model.findOne({username: username})
        if(user){
            throw new ConflictException('Username already exists');

        }else{
            return await new this.model({
                username, 
                password: hashedPassword,
                phone,
                created_at: currentDate,
                updated_at: currentDate
            }).save();
        }
    };
    // async findByPayload(payload: Payload) {
    //     const { username } = payload
    //     console.log(username);
    //      return await this.model.findOne({ username })
    //     }
    async signIn(signInDto: SignInDto): Promise<{accessToken: string}>{
        const {username, password} = signInDto;
        const user = await this.model.findOne({username: username});
        
        if(user && (await bcrypt.compare( password,user.password))){
            const payload: UserPayload = {id: user.id};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        }else{
            throw new UnauthorizedException('Please check your login credentials')
        }
    }
}
