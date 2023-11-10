import { Module } from '@nestjs/common';
import { TenantsController } from '../controllers/tenants.controller';
import { TenantsService } from '../services/tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
})
export class tenantModule {}
