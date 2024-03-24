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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.artistService.findOne(id);
    return response.status(status).json(message);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() response: Response,
  ) {
    const { status, message } = this.artistService.update(id, updateArtistDto);
    return response.status(status).json(message);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.artistService.remove(id);
    return response.status(status).json(message);
  }
}
