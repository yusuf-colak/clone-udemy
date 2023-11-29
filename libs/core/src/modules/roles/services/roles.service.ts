import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/prisma';
import { CreateRoleDto } from '@/modules/roles/dtos/createRole.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<any> {
    return this.prisma.role.create({
      data,
    });
  }

  findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({
      where: {
        name: {
          not: 'Superadmin', // Exclude roles with the 'Superadmin' name
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: string): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.RoleUpdateInput): Promise<Role> {
    return this.prisma.role.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.role.delete({
      where: { id },
    });
  }
}
