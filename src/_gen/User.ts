import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TimeCoin } from './TimeCoin';
import { Provider } from './Provider';
import { ProfileImage } from './ProfileImage';
import { FailgramPost } from './FailgramPost';
import { FailgramComment } from './FailgramComment';
import { FailgramLike } from './FailgramLike';

export class User {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: String })
  email!: string;

  @ApiProperty({ type: String })
  username!: string;

  @ApiProperty({ type: String })
  password!: string;

  @ApiPropertyOptional({ type: Number })
  role: number = 1;

  @ApiPropertyOptional({ type: String })
  provide: string = 'local';

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @ApiProperty({ type: Date })
  deletedAt!: Date | null;

  @ApiProperty({ type: () => TimeCoin })
  timeCoin!: TimeCoin | null;

  @ApiProperty({ type: () => Provider })
  provider!: Provider | null;

  @ApiProperty({ isArray: true, type: () => ProfileImage })
  profileImages!: ProfileImage[];

  @ApiProperty({ isArray: true, type: () => FailgramPost })
  failgramPosts!: FailgramPost[];

  @ApiProperty({ isArray: true, type: () => FailgramComment })
  failgramComments!: FailgramComment[];

  @ApiProperty({ isArray: true, type: () => FailgramLike })
  failgramLikes!: FailgramLike[];
}
