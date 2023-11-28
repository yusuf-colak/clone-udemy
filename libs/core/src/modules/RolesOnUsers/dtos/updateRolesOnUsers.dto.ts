import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolesOnUsersDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'userId',
  })
  userId?: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'roleId',
  })
  roleId?: string;

  @ApiProperty({ example: new Date(), description: 'assignedAt' }) // Use an actual date value
  assignedAt?: Date;
}
