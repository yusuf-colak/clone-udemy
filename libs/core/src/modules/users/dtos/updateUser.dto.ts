import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ example: 'test@example.com', description: "The user's e-mail." })
  email?: string;

  @ApiProperty({ example: 'John Doe', description: "The user's name." })
  name?: string;

  @ApiProperty({ example: 'strongpassword123', description: "The user's password." })
  password?: string;
}
