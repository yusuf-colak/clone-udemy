import { Injectable } from '@nestjs/common';
import {Permission} from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/prisma';
import { CreatePermissionDto } from "@/modules/permissions/dtos/createPermission.dto";


@Injectable()
export class PermissionsService {

  constructor(private prisma: PrismaService) {}

  async create(data: CreatePermissionDto): Promise<any> {
    return this.prisma.permission.create({
      data,
    });
  }

  findAll(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async findOne(id: string): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, data: Prisma.PermissionUpdateInput): Promise<Permission> {
    return this.prisma.permission.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.permission.delete({
      where: { id },
    });
  }
}
