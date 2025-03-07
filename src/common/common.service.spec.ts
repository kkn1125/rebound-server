import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: {
            get: vitest.fn(
              (name: string) =>
                ({
                  common: {
                    host: '127.0.0.1',
                    port: 8080,
                    version: '0.0.1',
                  },
                  secret: {
                    jwt: 'JWT_SECRET_KEY',
                    password: 'PASSWORD_SECRET_KEY',
                    session: 'SESSION_SECRET_KEY',
                  },
                })[name],
            ),
          },
        },
        CommonService,
      ],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be allow origin list: 4', () => {
    service.addHost('example.com');
    service.addPort(80);
    const allowOrigins = service.allowOrigins;
    expect(allowOrigins.length).toStrictEqual(4);
  });

  it('should be allow origin list: 2', () => {
    service.addPort(80);
    const allowOrigins = service.allowOrigins;
    expect(allowOrigins.length).toStrictEqual(2);
  });
});
