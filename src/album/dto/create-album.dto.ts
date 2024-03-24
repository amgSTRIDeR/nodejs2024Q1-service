import { IsNumber, IsString } from 'class-validator';
import { IsNullOrString } from 'src/common/nullOrStringValidator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsNullOrString()
  artistId: string | null;
}
