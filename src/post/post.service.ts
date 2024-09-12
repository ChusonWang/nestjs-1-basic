// Please not modify this file

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepositoryService as PostRepositoryService } from './post.repository.service';
import { InternalError, NotFoundError } from '../error';

@Injectable()
export class PostService {
  constructor(private readonly postResposiotyService: PostRepositoryService) { }

  create(createPostDto: CreatePostDto) {
    return this.postResposiotyService.create(createPostDto);
  }

  findAll() {
    return this.postResposiotyService.findAll();
  }

  async findOne(id: number) {
    const res = await this.postResposiotyService.realFindOne(id)
      .catch(
        err => {
          if (err.message === 'Network error' || err.message === 'Timeout')
            return this.findOne(id)
          if (err.message === 'Internal error')
            throw new HttpException(InternalError, HttpStatus.BAD_REQUEST)
        })
    if (res == null) throw new HttpException(NotFoundError, HttpStatus.NOT_FOUND)
    return res
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postResposiotyService.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postResposiotyService.remove(id);
  }
}
