import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackingDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'userId',
  })
  userId?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'courseId',
  })
  courseId?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'chapterId',
  })
  chapterId?: string;

  @ApiProperty({ example: 'boolean', description: 'isCompleted' })
  isCompleted?: boolean;
  @ApiProperty({ example: 'string', description: 'isTime' })
  isTime?: string;
}
