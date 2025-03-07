import { User } from '@prisma/client';

export class CreateJwtDto
  implements Pick<User, 'id' | 'email' | 'username' | 'role' | 'provide'>
{
  id!: number;
  email!: string;
  username!: string;
  role!: number;
  provide!: string;
}
