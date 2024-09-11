import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepositoryService } from './post.repository.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepositoryService],
  exports: [PostService, PostRepositoryService],
})
export class PostModule {}
