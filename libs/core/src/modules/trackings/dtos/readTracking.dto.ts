
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDefined } from 'class-validator';

export class ReadTrackingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'id of the Tracking' })
  id!: string;

  @ApiProperty({ example: 'boolean', description: 'isCompleted of the Tracking', required: false })
  isCompleted?: boolean;

  @ApiProperty({ example: 'number', description: 'isTime of the Tracking', required: false })
  isTime?: number;

  @ApiProperty({ example: '2023-12-01T13:55:29.098Z', description: 'createdAt of the Tracking' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-12-01T13:55:29.098Z', description: 'updatedAt of the Tracking' })
  updatedAt!: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'courseId of the Tracking' })
  courseId!: string;


  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'chapterId of the Tracking' })
  chapterId!: string;



  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'userId of the Tracking' })
  userId!: string;

}
