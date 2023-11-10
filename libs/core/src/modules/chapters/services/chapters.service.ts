import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma';
import { Chapter } from '@prisma/client';
import { CreateChapterDto } from '@/modules/chapters/dtos/createChapter.dto';
import { UpdateChapterDto } from '@/modules/chapters/dtos/updateChapter.dto';

@Injectable()
export class ChaptersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateChapterDto): Promise<Chapter> {
    return this.prisma.chapter.create({
      data,
    });
  }

  async findAll(): Promise<Chapter[]> {
    return this.prisma.chapter.findMany();
  }

  async findOne(id: string): Promise<Chapter | null> {
    return this.prisma.chapter.findUnique({
      where: { id },
    });
  }
  async findByCourseId(courseId: string): Promise<Chapter[]> {
    return this.prisma.chapter.findMany({
      where: { courseId },
    });
  }
  async update(id: string, data: UpdateChapterDto): Promise<Chapter> {
    return this.prisma.chapter.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Chapter> {
    return this.prisma.chapter.delete({
      where: { id },
    });
  }
}
