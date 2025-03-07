import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CommonService } from '@common/common.service';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '@common/common.module';

describe('AuthService', () => {
  let service: AuthService;

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
        {
          provide: CommonService,
          useValue: {
            getConfig: vitest.fn(
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
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
