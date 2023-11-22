import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma';
import { Tracking } from '@prisma/client';
import { CreateTrackingDto } from '@/modules/trackings/dtos/createTracking.dto';
import { UpdateTrackingDto } from '@/modules/trackings/dtos/updateTracking.dto';

@Injectable()
export class TrackingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTrackingDto): Promise<Tracking> {
    return this.prisma.tracking.create({
      data,
    });
  }

  async findAll(): Promise<Tracking[]> {
    return this.prisma.tracking.findMany();
  }

  async findAllByUserId(userId: string): Promise<Tracking[]> {
    return this.prisma.tracking.findMany({
      where: { userId },
    });
  }

  async findCourseIdAnduserId(userId: string,courseId:string): Promise<Tracking[]> {
    return this.prisma.tracking.findMany({
      where: { userId, courseId },
    });
  }

  async countAllByUserId(userId: string): Promise<number> {
    const trackings = await this.prisma.tracking.findMany({
      where: { userId },
    });
    return trackings.length;
  }
  async countCourseIds(
    userId: string
  ): Promise<{ courseId: string; count: number }[]> {
    const trackings = await this.prisma.tracking.findMany({
      where: { userId },
    });
    const uniqueCourseIds: string[] = Array.from(
      new Set(trackings.map((tracking) => tracking.courseId))
    );
    const courseCountArray: { courseId: string; count: number }[] = [];
    uniqueCourseIds.forEach((uniqueCourseId) => {
      const count = trackings.filter(
        (tracking) => tracking.courseId === uniqueCourseId
      ).length;
      courseCountArray.push({ courseId: uniqueCourseId, count });
    });
    return courseCountArray;
  }

  async createFind(data: CreateTrackingDto): Promise<Tracking> {
    const existingTrackings = await this.prisma.tracking.findMany({
      where: { userId: data.userId, chapterId: data.chapterId },
    });
    if (existingTrackings.length === 0) {
      return await this.prisma.tracking.create({
        data,
      });
    }
    return existingTrackings[0];
  }

  async findOne(id: string): Promise<Tracking | null> {
    return this.prisma.tracking.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateTrackingDto): Promise<Tracking> {
    return this.prisma.tracking.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Tracking> {
    return this.prisma.tracking.delete({
      where: { id },
    });
  }
}
