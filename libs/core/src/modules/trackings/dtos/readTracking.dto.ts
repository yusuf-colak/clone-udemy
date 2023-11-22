
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDefined } from 'class-validator';

export class ReadTrackingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'id of the Tracking' })
  id!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'userId of the Tracking' })
  userId!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'courseId of the Tracking' })
  courseId!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'chapterId of the Tracking' })
  chapterId!: string;

  @ApiProperty({ example: 'boolean', description: 'isCompleted of the Tracking', required: false })
  isCompleted?: boolean;

  @ApiProperty({ example: '2023-11-15T07:27:51.875Z', description: 'createdAt of the Tracking' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-11-15T07:27:51.875Z', description: 'updatedAt of the Tracking' })
  updatedAt!: Date;

}
