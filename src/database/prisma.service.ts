import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const prismaExtension = (prismaClient: PrismaClient) => {
  async function findManyAndCount<
    T,
    Args extends Prisma.Args<T, 'findMany' | 'count'>,
  >(this: T, args?: Args) {
    const context = Prisma.getExtensionContext(this) as any;
    const items = await context.findMany(args);
    const count = await context.count(args);
    return { items, count };
  }

  const extension = Prisma.defineExtension({
    model: {
      $allModels: { findManyAndCount },
    },
  });
  return prismaClient.$extends(extension);
};

export type ExtensionType = ReturnType<typeof prismaExtension>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  _client!: ExtensionType;

  constructor() {
    super({
      log: ['query'],
      errorFormat: 'colorless',
      transactionOptions: {
        isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead,
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  get client() {
    if (!this._client) this._client = prismaExtension(this);
    return this._client;
  }
}
