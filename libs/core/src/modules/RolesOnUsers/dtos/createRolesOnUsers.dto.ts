import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRolesOnUsersDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'userId',
  })
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'roleId',
  })
  @IsNotEmpty()
  roleId!: string;
  @ApiProperty({ example: new Date(), description: 'assignedAt' }) // Use an actual date value
  @IsNotEmpty()
  assignedAt!: Date;
}
