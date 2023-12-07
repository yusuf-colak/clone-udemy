import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateTenantDto {
  @ApiProperty({ example: 'test' })
  name?: string;
  
}
