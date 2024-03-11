import { Injectable } from '@nestjs/common';
import AlbumsDb from 'src/db/albumsDb';
import ArtistsDb from 'src/db/artistsDb';
import TracksDb from 'src/db/tracksDb';
import FavsDb from 'src/db/favsDb';
import { isUuid } from 'src/common/isUuid';

const favsDb = FavsDb.getInstance();
const albumsDb = AlbumsDb.getInstance();
const artistsDb = ArtistsDb.getInstance();
const tracksDb = TracksDb.getInstance();

@Injectable()
export class FavsService {
  findAll() {
    return favsDb.getAll();
  }

  addAlbumToFav(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const album = albumsDb.getById(id);
    if (!album) {
      return { status: 422, message: `Album with id: ${id} not found` };
    }

    favsDb.addAlbum(album);
    return {
      status: 201,
      message: `Album ${JSON.stringify(album)} added to favorites`,
    };
  }

  addTrackToFav(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const track = tracksDb.getById(id);
    if (!track) {
      return { status: 422, message: `Track with id: ${id} not found` };
    }

    favsDb.addTrack(track);
    return {
      status: 201,
      message: `Track ${JSON.stringify(track)} added to favorites`,
    };
  }

  addArtistToFav(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const artist = artistsDb.getById(id);
    if (!artist) {
      return { status: 422, message: `Artist with id: ${id} not found` };
    }

    favsDb.addArtist(artist);
    return {
      status: 201,
      message: `Artist ${JSON.stringify(artist)} added to favorites`,
    };
  }

  removeAlbumFromFav(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const isRemoved = favsDb.removeAlbum(id);
    if (!isRemoved) {
      return {
        status: 404,
        message: `Album with id: ${id} not found in favorites`,
      };
    }
    return {
      status: 204,
      message: `Album with id: ${id} removed from favorites`,
    };
  }

  removeTrackFromFav(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const isRemoved = favsDb.removeTrack(id);
    if (!isRemoved) {
      return {
        status: 404,
        message: `Track with id: ${id} not found in favorites`,
      };
    }
    return {
      status: 204,
      message: `Track with id: ${id} removed from favorites`,
    };
  }

  removeArtistFromFav(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const isRemoved = favsDb.removeArtist(id);
    if (!isRemoved) {
      return {
        status: 404,
        message: `Artist with id: ${id} not found in favorites`,
      };
    }
    return {
      status: 204,
      message: `Artist with id: ${id} removed from favorites`,
    };
  }
}
