import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import AlbumsDb from 'src/db/albumsDb';
import { Album } from './entities/album.entity';
import { isUuid } from 'src/common/isUuid';
import { v4 as uuidv4 } from 'uuid';

const albumsDb = AlbumsDb.getInstance();

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      ...createAlbumDto,
      id: uuidv4(),
    };
    albumsDb.create(album);
    return album;
  }

  findAll(): Album[] {
    const allAlbums = albumsDb.getAll();
    return allAlbums;
  }

  findOne(id: string): { status: number; message: string | Album } {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const album = albumsDb.getById(id);

    if (album) {
      return { status: 200, message: album };
    } else {
      return { status: 404, message: `Album with id: ${id} not found` };
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const album = albumsDb.getById(id);

    if (!album) {
      return { status: 404, message: `Album with id: ${id} not found` };
    }

    const updatedAlbum = albumsDb.updateAlbum(id, updateAlbumDto);

    return { status: 200, message: updatedAlbum };
  }

  remove(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const albumIsDeleted = albumsDb.deleteAlbum(id);

    if (albumIsDeleted) {
      return { status: 204, message: 'Album is found and deleted' };
    } else {
      return { status: 404, message: `Album with id: ${id} not found` };
    }
  }
}
