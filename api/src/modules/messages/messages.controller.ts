import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { Controller, Post, Res, Param, Body, HttpStatus, Get } from '@nestjs/common';

@Controller('api/v1')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post('messages')
    async createMessage(@Res() res, @Body() createMessageDto: CreateMessageDto) {
      const message = await this.messagesService.createMessage(createMessageDto);
      return res.status(HttpStatus.CREATED).json({
        status: 201,
        message: 'Successful!',
        data: message,
      });
    }

    @Get('messages')
    async getMessages(@Res() res) {
      const messages = await this.messagesService.getMessages();
      return res.status(HttpStatus.OK).json({
        status: 200,
        data: messages,
      });
    }
}
