import { Controller, Post, Body, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { SigninDto } from './dtos/signin.dto';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }
}
