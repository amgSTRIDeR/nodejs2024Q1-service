import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string, @Res() response: Response) {
  //   const { status, message } = this.userService.findOne(id);
  //   if (message instanceof Object) {
  //     const { password, ...userWithoutPassword } = message;
  //     return response.status(status).json(userWithoutPassword);
  //   } else {
  //     return response.status(status).json(message);
  //   }
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Put(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Res() response: Response,
  // ) {
  //   const { status, message } = this.userService.update(id, updateUserDto);
  //   if (message instanceof Object) {
  //     const { password, ...userWithoutPassword } = message;
  //     return response.status(status).json(userWithoutPassword);
  //   } else {
  //     return response.status(status).json(message);
  //   }
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string, @Res() response: Response) {
  //   const { status, message } = this.userService.remove(id);
  //   return response.status(status).json(message);
  // }
}
