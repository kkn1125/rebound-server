import { Test, TestingModule } from '@nestjs/testing';
import { FailgramPostsController } from './failgram-posts.controller';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { FailgramPostsService } from './failgram-posts.service';
import { PrismaService } from '@database/prisma.service';

const client = vitest.fn();

describe('FailgramPostsController', () => {
  let controller: FailgramPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FailgramPostsController],
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

    controller = module.get<FailgramPostsController>(FailgramPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
