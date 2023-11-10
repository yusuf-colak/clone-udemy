import { AuthController } from "@/core/auth/auth.controller";
import { JwtStrategy } from "@/core/auth/jwt.strategy";

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersController } from "@/modules/users/controllers/users.controller";
import { UsersService } from "@/modules/users/services/users.service";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from "@/core";
import { PrismaService } from '@/core/prisma';
import { AuthService } from '@/core/auth/auth.service';
import {LoginGateway} from "@/core/gateways/login.gateway";

@Module({
  imports: [
    CoreModule,
    PassportModule,
    JwtModule.register({
      secret: '1cfc9b996e53f963174b387eeb928a6aecd03b2222e78189653b44ea1b2e58f601a097f703c0366621e6eb4a447214ea8cae79e1d7392488475193a44bbbee363623e3e47fa5372fbca03f1d6966ff63eee1d356e4490cb96bb11c77368e285e0ba8c4277b6ae084d67d36cd587351be5cd7ff52510ebe1fa7ee55cd55de570a8f41ed40996086bd5633aa48674835f5e520e28c7970d744628465bf8a6dfdcc9901801e9e5af9d0e7ee91985fc7c3ec4b0998b95d6483e89cc5c104840e90cf9178b2802cf0bc3f2fcb6b62cd86ba280354e7303e2919ef7b371f96a74b083f59ad876945d8d87d0381d82c79b32f6be6a1ce2a573e6cacef044db1429d4738',  // Bu anahtarı gizli tutmalısınız. Gerçek projelerde .env dosyasından veya başka bir yöntemle almalısınız.
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, JwtStrategy, PrismaService, AuthService, LoginGateway],
})
export class AppModule {}
