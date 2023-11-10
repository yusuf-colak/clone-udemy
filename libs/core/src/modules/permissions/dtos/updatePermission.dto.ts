import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdatePermissionDto {
  @ApiProperty({ example: 'read' })
  action?: string;

  @ApiProperty({ example: 'User' })
  subject?: string;
}
