
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDefined } from 'class-validator';

export class ReadAttachmentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'id of the Attachment' })
  id!: string;

  @ApiProperty({ example: 'John Doe', description: 'name of the Attachment' })
  name!: string;

  @ApiProperty({ example: 'string', description: 'url of the Attachment' })
  url!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'courseId of the Attachment' })
  courseId!: string;


  @ApiProperty({ example: '2023-11-10T07:44:54.153Z', description: 'createdAt of the Attachment' })
  createdAt!: Date;

  @ApiProperty({ example: '2023-11-10T07:44:54.153Z', description: 'updatedAt of the Attachment', required: false })
  updatedAt?: Date;

}
