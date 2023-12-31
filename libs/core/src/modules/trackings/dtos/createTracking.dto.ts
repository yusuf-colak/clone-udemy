import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackingDto {
  @ApiProperty({ example: 'boolean', description: 'isCompleted' })
  @IsNotEmpty()
  @IsOptional()
  isCompleted?: boolean;

  @ApiProperty({ example: 'number', description: 'isTime' })
  @IsNotEmpty()
  @IsOptional()
  isTime?: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'courseId' })
  @IsNotEmpty()
  courseId!: string;

 
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'chapterId' })
  @IsNotEmpty()
  chapterId!: string;


  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'userId' })
  @IsNotEmpty()
  userId!: string;


}
