import { MessagesModule } from './../messages/messages.module';
import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports:[MessagesModule],
  providers: [ChatGateway],

})
export class ChatModule {}
