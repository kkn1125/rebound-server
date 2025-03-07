import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';
import { FailgramLog } from './FailgramLog';
import { FailgramComment } from './FailgramComment';
import { FailgramLike } from './FailgramLike';

export class FailgramPost {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ type: String })
  title!: string;

  @ApiProperty({ type: String })
  summary!: string;

  @ApiProperty({ type: Boolean })
  isPublic!: boolean;

  @ApiProperty({ type: Boolean })
  isPublished!: boolean;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @ApiProperty({ type: Date })
  deletedAt!: Date | null;

  @ApiProperty({ type: () => User })
  user!: User;

  @ApiProperty({ isArray: true, type: () => FailgramLog })
  failgramLogs!: FailgramLog[];

  @ApiProperty({ isArray: true, type: () => FailgramComment })
  failgramComments!: FailgramComment[];

  @ApiProperty({ isArray: true, type: () => FailgramLike })
  failgramLikes!: FailgramLike[];
}
