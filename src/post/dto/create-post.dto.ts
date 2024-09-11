// Please not modify this file

import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsNumber()
  authorId: number;
}