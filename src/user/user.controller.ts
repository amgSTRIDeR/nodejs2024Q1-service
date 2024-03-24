import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.userService.findOne(id);
    if (message instanceof Object) {
      const { password, ...userWithoutPassword } = message;
      return response.status(status).json(userWithoutPassword);
    } else {
      return response.status(status).json(message);
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    const { status, message } = this.userService.update(id, updateUserDto);
    if (message instanceof Object) {
      const { password, ...userWithoutPassword } = message;
      return response.status(status).json(userWithoutPassword);
    } else {
      return response.status(status).json(message);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.userService.remove(id);
    return response.status(status).json(message);
  }
}
