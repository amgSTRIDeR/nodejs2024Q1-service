import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export default class FavsDb {
  private static instance: FavsDb;
  private favs: { artists: Artist[]; albums: Album[]; tracks: Track[] } = {
    artists: [],
    albums: [],
    tracks: [],
  };
  public static getInstance(): FavsDb {
    if (!FavsDb.instance) {
      FavsDb.instance = new FavsDb();
    }
    return FavsDb.instance;
  }

  public getAll() {
    return this.favs;
  }

  public addArtist(artist: Artist) {
    this.favs.artists.push(artist);
  }

  public addAlbum(album: Album) {
    this.favs.albums.push(album);
  }

  public addTrack(track: Track) {
    this.favs.tracks.push(track);
  }

  public removeArtist(id: string) {
    const isExist = this.favs.artists.some((artist) => artist.id === id);
    if (!isExist) {
      return false;
    }
    this.favs.artists = this.favs.artists.filter((artist) => artist.id !== id);
    return true;
  }

  public removeAlbum(id: string) {
    const isExist = this.favs.albums.some((albums) => albums.id === id);
    if (!isExist) {
      return false;
    }
    this.favs.albums = this.favs.albums.filter((album) => album.id !== id);
    return true;
  }

  public removeTrack(id: string) {
    const isExist = this.favs.tracks.some((tracks) => tracks.id === id);
    if (!isExist) {
      return false;
    }
    this.favs.tracks = this.favs.tracks.filter((track) => track.id !== id);
    return true;
  }
}
