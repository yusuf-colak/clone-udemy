import { Injectable } from '@nestjs/common';
import { UsersService } from '@/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    domainUrl: string,
    email: string,
    passwordInput: string
  ): Promise<any> {
    const user: any = await this.usersService.findUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        passwordInput,
        user.password
      );
      if (isPasswordValid) {
        if (user.roles.some((role) => role.role.name === 'Superadmin')) {
          const { password, ...result } = user;
          return result;
        }

        if (user.tenant.domains.some((domain) => domain.url === domainUrl)) {
          const { password, ...result } = user;
          return result;
        }

        return null;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { user };
    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async me(id: string) {
    return await this.usersService.findOne(id);
  }
}
