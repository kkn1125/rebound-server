import { PrismaService } from '@database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FailgramPostsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(query: string) {
    return this.prisma.client.failgramPost.findManyAndCount({});
  }
}
