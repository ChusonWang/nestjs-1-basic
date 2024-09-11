import { Controller, Get, Param } from '@nestjs/common';
import { UserPost } from './entities/user-post.entity';
import { UserRepositoryService } from '../user/user.repository.service';
import { PostRepositoryService } from '../post/post.repository.service';

/** q4 */
@Controller('')
export class UserPostController {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly postRepositoryService: PostRepositoryService
  ) { }
  
  @Get('users/:id/posts')
  async getUserPosts(@Param('id') id: string): Promise<UserPost> {
    const { name, email } = await this.userRepositoryService.findOne(+id);
    const posts = await this.postRepositoryService.findByAuthorId(+id);
    return {
      id: +id,
      name: name,
      email: email,
      posts: posts,
    };
  }
}
