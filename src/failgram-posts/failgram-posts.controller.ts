import { Controller, Get, Query } from '@nestjs/common';
import { FailgramPostsService } from './failgram-posts.service';

@Controller('failgram-posts')
export class FailgramPostsController {
  constructor(private readonly failgramPostsService: FailgramPostsService) {}

  @Get()
  findAll(@Query() query: string) {
    console.log(query);
    return this.failgramPostsService.findAll(query);
  }
}
