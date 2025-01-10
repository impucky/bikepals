import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { SigninDto } from './dtos/signin.dto';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.signup(body);
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto) {
    return await this.authService.signin(body);
  }

  // @Post('/signout')
  // signout() {
  // }
}
