import { Controller, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('api/v1')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('users')
    async createUser(@Res() res, @Body() createUserDto: CreateUserDto) {
      const user = await this.userService.createUser(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        status: 201,
        message: 'Successful!',
        data: user,
      });
    }
}
