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

  public getById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  public updateTrack(id: string, info: Track) {
    const track = this.getById(id);
    if (!track) {
      return null;
    }

    const updatedTrack = {
      id,
      name: info.name !== undefined ? info.name : track.name,
      artistId: info.artistId !== undefined ? info.artistId : track.artistId,
      albumId: info.albumId !== undefined ? info.albumId : track.albumId,
      duration: info.duration !== undefined ? info.duration : track.duration,
    };

    this.tracks = this.tracks.map((track) =>
      track.id === id ? updatedTrack : track,
    );

    return updatedTrack;
  }

  public deleteTrack(id: string) {
    const track = this.getById(id);
    if (!track) {
      return false;
    }

    this.tracks = this.tracks.filter((track) => track.id !== id);
    return true;
  }

  public removeArtist = (artistId: string) => {
    this.tracks = this.tracks.map((track) => {
      if (track.artistId === artistId) {
        return {
          ...track,
          artistId: null,
        };
      }
      return track;
    });
  };

  public removeAlbum = (albumId: string) => {
    this.tracks = this.tracks.map((track) => {
      if (track.albumId === albumId) {
        return {
          ...track,
          albumId: null,
        };
      }
      return track;
    });
  };
}
