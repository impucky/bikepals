import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ username, email, password }: CreateUserDto) {
    const users = await this.usersService.find(email);

    if (users.length > 0) {
      throw new BadRequestException('Email is already in use');
    }

    const user = await this.usersService.create(username, email, password);
    return user;
  }
}
