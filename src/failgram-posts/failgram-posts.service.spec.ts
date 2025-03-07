import { Test, TestingModule } from '@nestjs/testing';
import { FailgramPostsService } from './failgram-posts.service';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { PrismaService } from '@database/prisma.service';

const client = vitest.fn();

describe('FailgramPostsService', () => {
  let service: FailgramPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FailgramPostsService,
        {
          provide: PrismaService,
          useValue: {
            client,
          },
        },
      ],
    }).compile();

    service = module.get<FailgramPostsService>(FailgramPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
