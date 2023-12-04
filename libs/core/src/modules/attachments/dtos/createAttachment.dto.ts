import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAttachmentDto {
  @ApiProperty({ example: 'John Doe', description: 'name' })
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'string', description: 'url' })
  @IsNotEmpty()
  url!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'courseId',
  })
  @IsNotEmpty()
  courseId!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'chapterId',
  })
  chapterId?: string;
}
