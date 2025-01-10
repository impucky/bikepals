import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  Session,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

@Serialize(UserDto)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  async findMe(@Session() session: any) {
    const user = await this.usersService.findOne(session.userId);

    if (!user) {
      throw new UnauthorizedException(`Not currently signed in`);
    }

    return user;
  }

  @Get('/:username')
  async findUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }

    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
