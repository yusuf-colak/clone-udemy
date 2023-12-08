import { ReadCategoryDto } from '@/modules/categories/dtos/readCategory.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDefined } from 'class-validator';

export class ReadCourseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'id of the Course',
  })
  id!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'userId of the Course',
  })
  userId!: string;

  @ApiProperty({ example: 'string', description: 'title of the Course' })
  title!: string;

  @ApiProperty({
    example: 'string',
    description: 'description of the Course',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'string',
    description: 'imageUrl of the Course',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    example: 'boolean',
    description: 'isPublished of the Course',
    required: false,
  })
  isPublished?: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'categoryId of the Course',
    required: false,
  })
  categoryId?: string;

  @ApiProperty({
    example: 'Category',
    description: 'category of the Course',
    required: false,
  })
  category?: ReadCategoryDto;

  @ApiProperty({ example: 'tenantId', description: 'tenantId of the Course' })
  tenantId!: string;

  @ApiProperty({
    example: '2023-11-09T06:57:35.928Z',
    description: 'createdAt of the Course',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2023-11-09T06:57:35.928Z',
    description: 'updatedAt of the Course',
  })
  updatedAt!: Date;
}
