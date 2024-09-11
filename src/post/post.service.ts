// Please not modify this file

import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepositoryService as PostRepositoryService } from './post.repository.service';

@Injectable()
export class PostService {
  constructor(private readonly postResposiotyService: PostRepositoryService) {}

  create(createPostDto: CreatePostDto) {
    return this.postResposiotyService.create(createPostDto);
  }

  findAll() {
    return this.postResposiotyService.findAll();
  }

  findOne(id: number) {
    return this.postResposiotyService.findOne(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postResposiotyService.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postResposiotyService.remove(id);
  }
}
