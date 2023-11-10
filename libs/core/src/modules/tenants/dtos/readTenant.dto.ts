import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {ReadRoleDto} from "@/modules/roles/dtos/readRole.dto";
export class ReadTenantDto {
  @ApiProperty({ example: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'test' })
  name!: string;
}
