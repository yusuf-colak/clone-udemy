import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreatePermissionDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'read' })
  action!: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'User' })
  subject!: string;
}
