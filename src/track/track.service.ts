import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import TracksDb from 'src/db/tracksDb';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './entities/track.entity';
import { isUuid } from 'src/common/isUuid';
import FavsDb from 'src/db/favsDb';

const tracksDb = TracksDb.getInstance();
const favsDb = FavsDb.getInstance();

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track = {
      ...createTrackDto,
      id: uuidv4(),
    };
    tracksDb.create(track);
    return track;
  }

  findAll(): Track[] {
    const allTracks = tracksDb.getAll();
    return allTracks;
  }

  findOne(id: string): { status: number; message: string | Track } {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const track = tracksDb.getById(id);

    if (track) {
      return { status: 200, message: track };
    } else {
      return { status: 404, message: `Track with id: ${id} not found` };
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const track = tracksDb.getById(id);

    if (!track) {
      return { status: 404, message: `Track with id: ${id} not found` };
    }

    const updatedTrack = tracksDb.updateTrack(id, updateTrackDto);

    return { status: 200, message: updatedTrack };
  }

  remove(id: string) {
    if (!isUuid(id)) {
      return { status: 400, message: 'Invalid UUID' };
    }

    const trackIsDeleted = tracksDb.deleteTrack(id);
    favsDb.removeTrack(id);

    if (trackIsDeleted) {
      return { status: 204, message: 'Track is found and deleted' };
    } else {
      return { status: 404, message: `Track with id: ${id} not found` };
    }
  }
}
