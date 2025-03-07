import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';
import { FailgramPost } from './FailgramPost';

export class FailgramLike {
  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ type: Number })
  failgramPostId!: number;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @ApiProperty({ type: Date })
  deletedAt!: Date | null;

  @ApiProperty({ type: () => User })
  user!: User;

  @ApiProperty({ type: () => FailgramPost })
  failgramPost!: FailgramPost;
}
