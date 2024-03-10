import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.albumService.findOne(id);
    return response.status(status).json(message);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateAlbumDto,
    @Res() response: Response,
  ) {
    const { status, message } = this.albumService.update(id, updateArtistDto);
    return response.status(status).json(message);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.albumService.remove(id);
    return response.status(status).json(message);
  }
}
