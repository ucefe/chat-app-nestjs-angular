import { UsersModule } from './../users/users.module';
import { Message } from './../../entities/message.entity';
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Message]),UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]

})
export class MessagesModule {}
