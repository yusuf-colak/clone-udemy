import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateDomainDto {

  @ApiProperty({ example: 'http://test.com' })
  url?: string;

  @ApiProperty({ example: false })
  secured?: boolean;

  @ApiProperty({ example: true })
  default?: boolean;
}
