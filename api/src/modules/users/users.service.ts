import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
      ) {}

    async findUserByName(name: string): Promise<User> {
        const users = await this.repository.find();
        return users.find((user) => user.name === name);
      }

    async findUserById(id: string): Promise<User> {
        return this.repository.findOneById(id)
          .then((user) => {
            return user;
          })
          .catch((err) => {
            throw new NotFoundException('User Not found');
          });
      }
    
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // Verify Name validity first
        if (await this.findUserByName(createUserDto.name))
          throw new BadRequestException(`Name already exists`);
    
        const user = this.repository.create(createUserDto);
        await this.repository.save(user);
        return user;
      }
}
