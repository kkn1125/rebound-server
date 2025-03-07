import { LoggerModule } from '@logger/logger.module';
import { LoggerMiddleware } from '@middleware/logger.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NestModule } from '@nestjs/common/interfaces';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { UtilsService } from './common/services/utils/utils.service';
import commonConf from './config/commonConf';
import secretConf from './config/secretConf';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { FailgramPostsModule } from './failgram-posts/failgram-posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConf, secretConf],
    }),
    DatabaseModule,
    CommonModule,
    AuthModule,
    UsersModule,
    LoggerModule,
    FailgramPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*api');
  }
}
