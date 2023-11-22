import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChapterDto {
  @ApiProperty({ example: 'string', description: 'title' })
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'string', description: 'description' })
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'string', description: 'videoUrl' })
  @IsNotEmpty()
  @IsOptional()
  videoUrl?: string;

  @ApiProperty({ example: 'string', description: 'videoTime' })
  @IsNotEmpty()
  @IsOptional()
  videoTime?: string;

  @ApiProperty({ example: 'number', description: 'position' })
  @IsNotEmpty()
  position!: number;

  @ApiProperty({ example: 'boolean', description: 'isPublished' })
  @IsNotEmpty()
  @IsOptional()
  isPublished?: boolean;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'courseId',
  })
  @IsNotEmpty()
  courseId!: string;
}
