import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import {ReadPermissionDto} from "@/modules/permissions/dtos/readPermission.dto";
export class ReadRoleDto {
  @ApiProperty({ example: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'Admin' })
  name!: string;

  @ApiProperty({ example: 'permission' })
  permissions!: ReadPermissionDto[];

  @ApiProperty({ example: '2023-10-06T14:08:52.005Z' })
  created_at!: string;

  @ApiProperty({ example: '2023-10-06T14:08:52.005Z', required: false })
  updated_at?: string;

  @ApiProperty({ example: '2023-10-06T14:08:52.005Z', required: false })
  deleted_at?: string;
}
