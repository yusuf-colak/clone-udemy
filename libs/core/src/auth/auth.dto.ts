import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'superadmin@microprefix', description: 'Kullanıcının e-posta adresi.' })
  email!: string;

  @ApiProperty({ example: 'superadmin', description: 'Kullanıcının şifresi.' })
  password!: string;

}
