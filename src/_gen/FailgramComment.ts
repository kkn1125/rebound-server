import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';
import { FailgramPost } from './FailgramPost';

export class FailgramComment {
  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ type: Number })
  failgramPostId!: number;

  @ApiProperty({ type: String })
  comment!: string;

  @ApiProperty({ type: Number })
  layer!: number;

  @ApiProperty({ type: Number })
  group!: number;

  @ApiProperty({ type: Number })
  order!: number;

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
