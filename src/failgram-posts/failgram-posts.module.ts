import { Module } from '@nestjs/common';
import { FailgramPostsController } from './failgram-posts.controller';
import { FailgramPostsService } from './failgram-posts.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FailgramPostsController],
  providers: [FailgramPostsService],
})
export class FailgramPostsModule {}
