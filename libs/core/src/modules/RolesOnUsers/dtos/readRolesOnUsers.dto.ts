import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsDefined } from 'class-validator';

export class ReadRolesOnUsersDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'userId of the RolesOnUsers',
  })
  userId!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'roleId of the RolesOnUsers',
  })
  roleId!: string;

  @ApiProperty({
    example: new Date(),
    description: 'assignedAt of the RolesOnUsers',
  }) // Use an actual date value
  assignedAt!: Date;
}
