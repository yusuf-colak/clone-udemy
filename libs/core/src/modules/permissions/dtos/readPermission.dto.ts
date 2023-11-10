import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {ReadRoleDto} from "@/modules/roles/dtos/readRole.dto";
export class ReadPermissionDto {
  @ApiProperty({ example: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'read' })
  action!: string;

  @ApiProperty({ example: 'User' })
  subject!: string;
}
