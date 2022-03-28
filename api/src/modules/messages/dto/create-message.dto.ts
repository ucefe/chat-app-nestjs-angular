import { User } from './../../../entities/user.entity';
import {
    IsNotEmpty,
    IsString,
    Length,
    IsOptional,
  } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    @Length(0, 500)
    messageContent: string;

    @IsOptional()
    user: User;
  
  }