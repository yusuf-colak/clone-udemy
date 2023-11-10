import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateTenantDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'test' })
  name!: string;
}
