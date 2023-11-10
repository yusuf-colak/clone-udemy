import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'John Doe', description: 'name' })
  @IsNotEmpty()
  name!: string;

 

}
