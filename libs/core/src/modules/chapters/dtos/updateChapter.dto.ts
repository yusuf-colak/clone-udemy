import { ApiProperty } from '@nestjs/swagger';

export class UpdateChapterDto {
  @ApiProperty({ example: 'string', description: 'title' })
  title?: string;

  @ApiProperty({ example: 'string', description: 'description' })
  description?: string;

  @ApiProperty({ example: 'string', description: 'videoUrl' })
  videoUrl?: string;

  @ApiProperty({ example: 'string', description: 'videoTime' })
  videoTime?: string;

  @ApiProperty({ example: 'number', description: 'position' })
  position?: number;

  @ApiProperty({ example: 'boolean', description: 'isPublished' })
  isPublished?: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'courseId',
  })
  courseId?: string;
}
