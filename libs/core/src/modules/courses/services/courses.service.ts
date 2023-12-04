import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma';
import { Course } from '@prisma/client';
import { CreateCourseDto } from '@/modules/courses/dtos/createCourse.dto';
import { UpdateCourseDto } from '@/modules/courses/dtos/updateCourse.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCourseDto): Promise<Course> {
    return this.prisma.course.create({
      data,
    });
  }

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: {
        chapters: true,
        attachments: true,
      },
    });
  }

  async findOne(id: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        chapters: true,
        attachments: {
          where: {
            chapterId: null,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateCourseDto): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Course> {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
