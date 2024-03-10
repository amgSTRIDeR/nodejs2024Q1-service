import { Album } from 'src/album/entities/album.entity';

export default class AlbumsDb {
  private static instance: AlbumsDb;
  private albums: Album[] = [];
  public static getInstance(): AlbumsDb {
    if (!AlbumsDb.instance) {
      AlbumsDb.instance = new AlbumsDb();
    }
    return AlbumsDb.instance;
  }

  public create(album: Album) {
    this.albums.push(album);
  }

  public getAll() {
    return this.albums;
  }

  public getById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  public updateAlbum(id: string, info: Album) {
    const album = this.getById(id);
    if (!album) {
      return null;
    }

    const updatedAlbum = {
      id,
      name: info.name !== undefined ? info.name : album.name,
      year: info.year !== undefined ? info.year : album.year,
      artistId: info.artistId !== undefined ? info.artistId : album.artistId,
    };

    this.albums = this.albums.map((album) =>
      album.id === id ? updatedAlbum : album,
    );

    return updatedAlbum;
  }

  public deleteAlbum(id: string) {
    const album = this.getById(id);
    if (!album) {
      return false;
    }

    this.albums = this.albums.filter((album) => album.id !== id);
    return true;
  }

  public removeArtist = (artistId: string) => {
    this.albums = this.albums.map((album) => {
      if (album.artistId === artistId) {
        return {
          ...album,
          artistId: null,
        };
      }
      return album;
    });
  };
}
