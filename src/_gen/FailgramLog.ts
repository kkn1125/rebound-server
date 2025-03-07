import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FailgramPost } from './FailgramPost';

export class FailgramLog {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: Number })
  failgramPostId!: number;

  @ApiProperty({ type: String })
  subject!: string;

  @ApiProperty({ type: String })
  description!: string;

  @ApiPropertyOptional({ type: String })
  type: string = 'description';

  @ApiProperty({ type: Number })
  sequence!: number;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @ApiProperty({ type: Date })
  deletedAt!: Date | null;

  @ApiProperty({ type: () => FailgramPost })
  failgramPost!: FailgramPost;
}
