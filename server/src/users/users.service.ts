import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.repo = repo;
  }

  create(username: string, email: string, password: string) {
    const user = this.repo.create({ username, email, password });
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.repo.remove([user]);
  }

  async update(id: number, attributes: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.checkForDuplicates(attributes.username, attributes.email, id);

    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async findByUsername(username: string) {
    return this.repo.findOneBy({ username });
  }

  async checkForDuplicates(username?: string, email?: string, id?: number) {
    const query = this.repo.createQueryBuilder('user');

    if (username) {
      query.orWhere('user.username = :username', { username });
    }
    if (email) {
      query.orWhere('user.email = :email', { email });
    }
    // Ignore current user
    if (id) {
      query.andWhere('user.id != :id', { id });
    }

    const existingUser = await query.getOne();

    if (existingUser) {
      if (existingUser.email === email) {
        throw new BadRequestException('Email is already in use');
      }
      if (existingUser.username === username) {
        throw new BadRequestException('Username is already in use');
      }
    }
  }
}
