import { Injectable } from '@nestjs/common';
import { Tenant, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/prisma';
import { CreateTenantDto } from '@/core/modules/tenants/dtos/createTenant.dto';
import { Course } from '@prisma/client'; // Import the Course type

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTenantDto): Promise<any> {
    return this.prisma.tenant.create({
      data,
    });
  }

  findAll(): Promise<Tenant[]> {
    return this.prisma.tenant.findMany();
  }

  async findOne(id: string): Promise<Tenant | null> {
    return this.prisma.tenant.findUnique({
      where: {
        id,
      },
      include: {
        course: true,
      },
    });
  }

  async findImageAndNameTenant(id: string): Promise<Tenant | null> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        image: true,
      },
    });

    return tenant as Tenant;
  }

  async findCoursesForTenant(id: string): Promise<Course[]> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id,
      },
      include: {
        course: {
          include: {
            chapters: true,
            attachments: true,
          },
        },
      },
    });

    return tenant?.course || [];
  }
  async findUserForTenant(id: string): Promise<User[]> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          include: {
            roles: true,
          },
          where: {
            roles: {
              some: {
                role: {
                  name: {
                    not: 'Superadmin', // Exclude users with the 'Superadmin' role
                  },
                },
              },
            },
          },
        },
      },
    });

    return tenant?.users || [];
  }

  async update(id: string, data: Prisma.TenantUpdateInput): Promise<Tenant> {
    return this.prisma.tenant.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.tenant.delete({
      where: { id },
    });
  }
}
