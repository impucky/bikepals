import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ username, email, password }: CreateUserDto) {
    await this.usersService.checkForDuplicates(username, email);

    const user = await this.usersService.create(username, email, password);
    return user;
  }

  // async signin(email: string, password: string) {}

  // async signout() {}
}
