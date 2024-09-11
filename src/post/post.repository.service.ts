// Please not modify this file

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

import {
  InternalError,
  NetworkError,
  TimeoutError,
  NotFoundError,
} from '../error';

export const postDB: Post[] = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Post 1 content',
    authorId: 1,
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let realFindOneCount = 0;

@Injectable()
export class PostRepositoryService {
  async create(createPostDto: {
    title: string;
    content: string;
    authorId: number;
  }) {
    await delay(100);
    const data = {
      id: postDB.length + 1,
      ...createPostDto,
    };
    postDB.push(data);
    return data;
  }

  async findAll() {
    await delay(100);

    return postDB;
  }

  async findByAuthorId(id: number) {
    await delay(100);
    const post = postDB.filter(post => post.authorId === id)
    if (!post) {
      throw NotFoundError;
    }
    return post;
  }

  /** use for Question 3 */
  // 1. 當 NetworkError or TimeoutError 實現retry.
  // 2. 當 InternalError response BadRequestException([hint](https://docs.nestjs.com/exception-filters))
  // 3. return = null 時 NotFoundException
  async findOne(id: number): Promise<Post | null> {
    while (true) {
      realFindOneCount += 1;
      if (realFindOneCount === 1) {
        break;
      } else if (realFindOneCount === 2) {
        continue;
      } else if (realFindOneCount === 3) {
        continue;
      } else if (realFindOneCount === 4) {
        break;
      } else if (realFindOneCount === 5) {
        throw new HttpException(InternalError, HttpStatus.BAD_REQUEST);
      } else if (realFindOneCount === 6) {
        throw new HttpException(NotFoundError, HttpStatus.NOT_FOUND);
      } else {
        realFindOneCount = 1;
        break;
      }
    }
    await delay(100);
    const post = postDB.find(post => post.id = id);
    if (!post) {
      throw NotFoundError;
    }
    return post;
  }

  async update(
    id: number,
    updatePostDto: {
      title?: string;
      content?: string;
      authorId?: number;
    },
  ) {
    await delay(100);

    const post = postDB.find((user) => user.id === id);

    if (updatePostDto.title) {
      post.title = updatePostDto.title;
    }

    if (updatePostDto.content) {
      post.content = updatePostDto.content;
    }

    if (updatePostDto.authorId) {
      post.authorId = updatePostDto.authorId;
    }

    return post;
  }

  async remove(id: number) {
    await delay(100);

    const index = postDB.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    const post = postDB[index];
    postDB.splice(index, 1);
    return post;
  }
}
