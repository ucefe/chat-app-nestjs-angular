import { MessagesService } from './../../messages/messages.service';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private messagesService: MessagesService,
  ) {
  }

  @WebSocketServer() server: Server;

  @SubscribeMessage('messageToServer')
  async handleMessage(client: any, payload: any) {
     if(!payload || !payload.user)  return this.server.to(client.id).emit('messageToClient', 'enter valid payload');
    else{ const messageCreated =await this.messagesService.createMessage(payload)
      if(messageCreated)  
      return this.server.emit('messageToClient', messageCreated);}
  }


  afterInit(server: Server) {
    console.log('init');
  }

   handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);

  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

}
