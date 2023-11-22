
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDefined } from 'class-validator';

export class ReadChapterDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'id of the Chapter' })
  id!: string;

  @ApiProperty({ example: 'string', description: 'title of the Chapter' })
  title!: string;

  @ApiProperty({ example: 'string', description: 'description of the Chapter', required: false })
  description?: string;

  @ApiProperty({ example: 'string', description: 'videoUrl of the Chapter', required: false })
  videoUrl?: string;

  @ApiProperty({ example: 'string', description: 'videoTime of the Chapter', required: false })
  videoTime?: string;

  @ApiProperty({ example: 'number', description: 'position of the Chapter' })
  position!: number;

  @ApiProperty({ example: 'boolean', description: 'isPublished of the Chapter', required: false })
  isPublished?: boolean;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'courseId of the Chapter' })
  courseId!: string;

  @ApiProperty({ example: '2023-11-09T06:58:05.675Z', description: 'createdAt of the Chapter' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-11-09T06:58:05.675Z', description: 'updatedAt of the Chapter' })
  updatedAt!: Date;

}
