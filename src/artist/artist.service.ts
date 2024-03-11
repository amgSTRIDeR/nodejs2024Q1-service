import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import ArtistsDb from 'src/db/artistsDb';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { isUuid } from 'src/common/isUuid';
import TracksDb from 'src/db/tracksDb';

const artistsDb = ArtistsDb.getInstance();
const tracksDb = TracksDb.getInstance();

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    artistsDb.create(artist);
    return artist;
  }

  findAll(): Artist[] {
    const allArtists = artistsDb.getAll();
    return allArtists;
  }

  findOne(id: string): { status: number; message: string | Artist } {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const artist = artistsDb.getById(id);

    if (artist) {
      return { status: 200, message: artist };
    } else {
      return { status: 404, message: `Artist with id: ${id} not found` };
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const artist = artistsDb.getById(id);

    if (!artist) {
      return { status: 404, message: `Artist with id: ${id} not found` };
    }

    const updatedArtist = artistsDb.updateArtist(id, updateArtistDto);

    return { status: 200, message: updatedArtist };
  }

  remove(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const artistIsDeleted = artistsDb.deleteArtist(id);
    tracksDb.removeArtist(id);

    if (artistIsDeleted) {
      return { status: 204, message: 'Artist is found and deleted' };
    } else {
      return { status: 404, message: `Artist with id: ${id} not found` };
    }
  }
}
