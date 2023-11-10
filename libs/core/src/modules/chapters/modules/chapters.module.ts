import { Module } from '@nestjs/common';
import { ChaptersController } from '../controllers/chapters.controller';
import { ChaptersService } from '../services/chapters.service';

@Module({
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChapterModule {}
