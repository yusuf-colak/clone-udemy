import { Module } from '@nestjs/common';

import { RolesOnUsersController } from '../controllers/RolesOnUsers.controller';
import { RolesOnUsersService } from '../services/RolesOnUsers.service';
@Module({
  controllers: [RolesOnUsersController],
  providers: [RolesOnUsersService],
})
export class RolesOnUsersModule {}
