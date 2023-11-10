import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'userId' })
  userId?: string;

  @ApiProperty({ example: 'string', description: 'title' })
  title?: string;

  @ApiProperty({ example: 'string', description: 'description' })
  description?: string;

  @ApiProperty({ example: 'string', description: 'imageUrl' })
  imageUrl?: string;

  @ApiProperty({ example: 'boolean', description: 'isPublished' })
  isPublished?: boolean;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'categoryId' })
  categoryId?: string;

}
