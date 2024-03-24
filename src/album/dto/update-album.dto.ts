import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsString } from 'class-validator';
import { IsNullOrString } from 'src/common/nullOrStringValidator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  name?: string;

  @IsNumber()
  year?: number;

  @IsNullOrString()
  artistId?: string | null;
}
