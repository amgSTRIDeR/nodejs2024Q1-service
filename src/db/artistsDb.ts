import { Artist } from 'src/artist/entities/artist.entity';

export default class ArtistsDb {
  private static instance: ArtistsDb;
  private artists: Artist[] = [];
  public static getInstance(): ArtistsDb {
    if (!ArtistsDb.instance) {
      ArtistsDb.instance = new ArtistsDb();
    }
    return ArtistsDb.instance;
  }

  public create(artist: Artist) {
    this.artists.push(artist);
  }

  public getAll() {
    return this.artists;
  }

  public getById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  public updateArtist(id: string, info: Artist) {
    const artist = this.getById(id);
    if (!artist) {
      return null;
    }

    const updatedArtist = {
      id,
      ...info,
    };

    this.artists = this.artists.map((artist) =>
      artist.id === id ? updatedArtist : artist,
    );

    return updatedArtist;
  }

  public deleteArtist(id: string) {
    const artist = this.getById(id);
    if (!artist) {
      return false;
    }

    this.artists = this.artists.filter((artist) => artist.id !== id);

    return true;
  }
}
