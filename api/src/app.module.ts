import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MessagesModule } from './modules/messages/messages.module';
import { configService } from './db/dbconfig,service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './modules/chat/chat.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UsersModule, MessagesModule,TypeOrmModule.forRoot(configService.getTypeOrmConfig()), ChatModule, 
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'frontend/chat-app'),

  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
 