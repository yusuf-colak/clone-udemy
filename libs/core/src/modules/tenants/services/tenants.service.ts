import { Injectable } from '@nestjs/common';
import {Tenant} from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/core/prisma';
import { CreateTenantDto } from "@/core/modules/tenants/dtos/createTenant.dto";


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
        id
      }
    });
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
