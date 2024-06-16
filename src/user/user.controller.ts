import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/createUserDto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ description: 'Route for creating user' })
  @ApiResponse({
    status: 201,
    description: 'User has been succesfully created. It returns created user.',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
