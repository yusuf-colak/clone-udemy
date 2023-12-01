import { Module } from '@nestjs/common';
import { TrackingsController } from '../controllers/trackings.controller';
import { TrackingsService } from '../services/trackings.service';

@Module({
  controllers: [TrackingsController],
  providers: [TrackingsService],
})
export class TrackingModule {}
