import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma';
import { Attachment } from '@prisma/client';
import { CreateAttachmentDto } from '@/modules/attachments/dtos/createAttachment.dto';
import { UpdateAttachmentDto } from '@/modules/attachments/dtos/updateAttachment.dto';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAttachmentDto): Promise<Attachment> {
    return this.prisma.attachment.create({
      data,
    });
  }

  async findAll(): Promise<Attachment[]> {
    return this.prisma.attachment.findMany();
  }

  async findOne(id: string): Promise<Attachment | null> {
    return this.prisma.attachment.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateAttachmentDto): Promise<Attachment> {
    return this.prisma.attachment.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Attachment> {
    return this.prisma.attachment.delete({
      where: { id },
    });
  }
}
