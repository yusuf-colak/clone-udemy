import { Module } from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { PermissionsController } from '../controllers/permissions.controller';

@Module({
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
