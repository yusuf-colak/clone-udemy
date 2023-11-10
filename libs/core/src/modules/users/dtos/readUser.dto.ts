import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import {ReadRoleDto} from "@/modules/roles/dtos/readRole.dto";
export class ReadUserDto {
  @ApiProperty({ example: '0b50870b-b359-4ac4-b6a4-b6a2aefdd9b2' })
  id!: string;

  @ApiProperty({ example: 'test@example.com' })
  email!: string;

  @ApiProperty({ example: 'John Doe', required: false })
  name?: string;

  @ApiProperty({ example: 'strongpassword123' })
  password!: string;

  @ApiProperty({ required: false })
  roles?: ReadRoleDto[];
}
