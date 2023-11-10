import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateDomainDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'http://test.com' })
  url!: string;

  @IsNotEmpty()
  @ApiProperty({ example: false })
  secured!: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: true })
  default!: boolean;
}
