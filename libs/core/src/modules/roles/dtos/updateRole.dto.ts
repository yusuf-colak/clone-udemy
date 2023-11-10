import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateRoleDto {
  @ApiProperty({ example: 'Admin' })
  name?: string;
}
