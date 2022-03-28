import { UsersService } from './../users/users.service';
import { User } from './../../entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from 'src/entities/message.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Message) private readonly repository: Repository<Message>,
        private usersService: UsersService,
      ) {}

      async getMessages(){
        return this.repository.find({
            relations: ['user'],
        })
    }
    
    async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        if(createMessageDto.user){
        createMessageDto.user= await this.usersService.findUserById(createMessageDto.user.id)
        const message = this.repository.create(createMessageDto);
        await this.repository.save(message);
        return message;
        }
        throw new NotFoundException(`Enter valid message`);
    }

   
}
