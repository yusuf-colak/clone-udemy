import { Injectable } from '@nestjs/common';
import {Domain} from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/prisma';
import { CreateDomainDto } from "@/core/modules/domains/dtos/createDomain.dto";


@Injectable()
export class DomainsService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreateDomainDto): Promise<any> {
    return this.prisma.domain.create({
      data,
    });
  }

  findAll(): Promise<Domain[]> {
    return this.prisma.domain.findMany();
  }

  async findOne(id: string): Promise<Domain | null> {
    return this.prisma.domain.findUnique({
      where: {
        id
      }
    });
  }

  async findByUrl(url: string): Promise<Domain | null> {
    return this.prisma.domain.findFirst({
      where: {
        url
      }
    });
  }

  async update(id: string, data: Prisma.DomainUpdateInput): Promise<Domain> {
    return this.prisma.domain.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.domain.delete({
      where: { id },
    });
  }
}
