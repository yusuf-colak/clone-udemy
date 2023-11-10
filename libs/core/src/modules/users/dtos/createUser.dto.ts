import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@example.com', description: "The user's e-mail." })
  email!: string;

  @IsOptional()
  @ApiProperty({ example: 'John Doe', description: "The user's name.", required: false })
  name?: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'strongpassword123', description: "The user's password." })
  password!: string;
}
