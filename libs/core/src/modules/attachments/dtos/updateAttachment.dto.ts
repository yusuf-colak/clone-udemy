import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttachmentDto {
  @ApiProperty({ example: 'John Doe', description: 'name' })
  name?: string;

  @ApiProperty({ example: 'string', description: 'url' })
  url?: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'courseId' })
  courseId?: string;

}
