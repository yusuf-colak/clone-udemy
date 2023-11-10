import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'userId' })
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 'string', description: 'title' })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'string', description: 'description' })
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'string', description: 'imageUrl' })
  @IsNotEmpty()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: 'boolean', description: 'isPublished' })
  @IsNotEmpty()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'categoryId' })
  @IsNotEmpty()
  @IsOptional()
  categoryId?: string;

  

}
