import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';

export class Provider {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ type: String })
  type!: string;

  @ApiProperty({ type: String })
  token!: string | null;

  @ApiProperty({ type: String })
  refresh!: string | null;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: () => User })
  user!: User;
}
