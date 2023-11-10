import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {ReadRoleDto} from "@/modules/roles/dtos/readRole.dto";
export class ReadDomainDto {
  @ApiProperty({ example: 'uuid' })
  id!: string;

  @ApiProperty({ example: 'http://test.com' })
  url!: string;

  @ApiProperty({ example: false })
  secured!: boolean;

  @ApiProperty({ example: true })
  default!: boolean;
}
