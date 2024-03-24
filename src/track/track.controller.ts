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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.trackService.findOne(id);
    return response.status(status).json(message);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
    @Res() response: Response,
  ) {
    const { status, message } = this.trackService.update(id, updateTrackDto);
    return response.status(status).json(message);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.trackService.remove(id);
    return response.status(status).json(message);
  }
}
