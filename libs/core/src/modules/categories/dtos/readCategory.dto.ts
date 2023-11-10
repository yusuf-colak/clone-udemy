
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDefined } from 'class-validator';

export class ReadCategoryDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'id of the Category' })
  id!: string;

  @ApiProperty({ example: 'John Doe', description: 'name of the Category' })
  name!: string;


}
