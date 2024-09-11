import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserPostModule } from './user-post/user-post.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, UserPostModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
