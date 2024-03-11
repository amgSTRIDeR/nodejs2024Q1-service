import { Controller, Get, Post, Param, Delete, Res } from '@nestjs/common';
import { FavsService } from './favs.service';
import { Response } from 'express';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.favsService.addAlbumToFav(id);
    return response.status(status).json(message);
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.favsService.addTrackToFav(id);
    return response.status(status).json(message);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.favsService.addArtistToFav(id);
    return response.status(status).json(message);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.favsService.removeAlbumFromFav(id);
    return response.status(status).json(message);
  }
  @Delete('track/:id')
  removeTrack(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.favsService.removeTrackFromFav(id);
    return response.status(status).json(message);
  }
  @Delete('artist/:id')
  removeArtist(@Param('id') id: string, @Res() response: Response) {
    const { status, message } = this.favsService.removeArtistFromFav(id);
    return response.status(status).json(message);
  }
}
