import { LoggerService } from '@logger/logger.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { PermissionGuard } from './permission.guard';

describe('PermissionGuard', () => {
  let logger: LoggerService = new LoggerService();

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [],
    // }).compile();
    // logger = module.get<LoggerService>(LoggerService);
    logger.setContext('TestPermissionGuard');
  });

  it('should be defined', () => {
    expect(new PermissionGuard(logger)).toBeDefined();
  });
});
