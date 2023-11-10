import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Admin' })
  name!: string;
}
