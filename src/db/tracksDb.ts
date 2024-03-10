import { Track } from 'src/track/entities/track.entity';

export default class TracksDb {
  private static instance: TracksDb;
  private tracks: Track[] = [];
  public static getInstance(): TracksDb {
    if (!TracksDb.instance) {
      TracksDb.instance = new TracksDb();
    }
    return TracksDb.instance;
  }

  public create(track: Track) {
    this.tracks.push(track);
  }

  public getAll() {
    return this.tracks;
  }

  // public getById(id: string) {
  //   return this.artists.find((artist) => artist.id === id);
  // }

  // public updateArtist(id: string, info: Artist) {
  //   const artist = this.getById(id);
  //   if (!artist) {
  //     return null;
  //   }

  //   const updatedArtist = {
  //     id,
  //     ...info,
  //   };

  //   this.artists = this.artists.map((artist) =>
  //     artist.id === id ? updatedArtist : artist,
  //   );

  //   return updatedArtist;
  // }

  // public deleteArtist(id: string) {
  //   const artist = this.getById(id);
  //   if (!artist) {
  //     return false;
  //   }

  //   this.artists = this.artists.filter((artist) => artist.id !== id);
  //   return true;
  // }
}
