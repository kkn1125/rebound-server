import { ApiProperty } from '@nestjs/swagger';
import { User } from './User';

export class TimeCoin {
  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ type: Number })
  coin!: number;

  @ApiProperty({ type: Boolean })
  isActive!: boolean;

  @ApiProperty({ type: () => User })
  user!: User;
}
