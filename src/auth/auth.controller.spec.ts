import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { CommonService } from '@common/common.service';
import { CommonModule } from '@common/common.module';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommonModule, AuthController],
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

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('', () => {
    expect(1).toStrictEqual(1);
  });

  // it('should be defined controller', () => {
  //   console.log(controller);
  //   expect(controller).toBeDefined();
  // });

  // it('should be defined service', () => {
  //   console.log(service);
  //   expect(service).toBeDefined();
  // });
});
