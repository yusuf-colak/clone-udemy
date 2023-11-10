import { Module } from '@nestjs/common';
import { DomainsController } from '../controllers/domains.controller';
import { DomainsService } from '../services/domains.service';

@Module({
  controllers: [DomainsController],
  providers: [DomainsService],
})
export class DomainModule {}
