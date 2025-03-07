import { User } from '@prisma/client';

export class LoginAuthDto
  implements Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt' | 'password'>
{
  id!: number;
  email!: string;
  username!: string;
  role!: number;
  provide!: string;
}
