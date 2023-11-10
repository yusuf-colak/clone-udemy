import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'John Doe', description: 'name' })
  name?: string;

}
