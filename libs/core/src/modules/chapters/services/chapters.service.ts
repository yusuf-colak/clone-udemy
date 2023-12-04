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

  // async findAllLength(): Promise<number> {
  //   const chapters = await this.prisma.chapter.findMany();
  //   return chapters.length;
  // }
  async findAllLength(): Promise<number> {
    const chapters = await this.prisma.chapter.findMany({
      where: {
        course: {
          isPublished: true, // Eğer isPublished true ise sadece o kursları al
        },
      },
    });
    return chapters.length;
  }

  async findOne(id: string): Promise<Chapter | null> {
    return this.prisma.chapter.findUnique({
      where: { id },
    });
  }
  async findByCourseId(courseId: string): Promise<Chapter[]> {
    return this.prisma.chapter.findMany({
      where: { courseId },
      include: {
        attachments: true,
      },
    });
  }
  async update(id: string, data: UpdateChapterDto): Promise<Chapter> {
    return this.prisma.chapter.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Chapter> {
    // Silinecek chapter'ın pozisyonunu al
    const deletedChapter = await this.prisma.chapter.findUnique({
      where: { id },
    });

    if (!deletedChapter) {
      throw new Error('Chapter not found');
    }

    // Chapter'ı sil
    await this.prisma.chapter.delete({
      where: { id },
    });

    // Silinen chapter'ın pozisyonundan sonraki tüm chapter'ların pozisyonunu güncelle
    await this.prisma.chapter.updateMany({
      where: {
        position: { gt: deletedChapter.position },
        courseId: deletedChapter.courseId,
      },
      data: {
        position: { increment: -1 },
      },
    });

    return deletedChapter;
  }
}
