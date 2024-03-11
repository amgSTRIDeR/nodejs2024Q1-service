import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString } from 'class-validator';
import { IsNullOrString } from 'src/common/nullOrStringValidator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name?: string;

  @IsNullOrString()
  artistId?: string | null;

  @IsNullOrString()
  albumId?: string | null;

  @IsNumber()
  duration?: number;
}
