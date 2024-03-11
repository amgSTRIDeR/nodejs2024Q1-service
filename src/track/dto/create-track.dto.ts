import { IsNumber, IsString } from 'class-validator';
import { IsNullOrString } from 'src/common/nullOrStringValidator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNullOrString()
  artistId: string | null;

  @IsNullOrString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
