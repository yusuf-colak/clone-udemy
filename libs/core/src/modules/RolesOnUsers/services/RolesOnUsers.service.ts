import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/prisma';
import { RolesOnUsers } from '@prisma/client';
import { CreateRolesOnUsersDto } from '../dtos/createRolesOnUsers.dto';
import { UpdateRolesOnUsersDto } from '../dtos/updateRolesOnUsers.dto';

@Injectable()
export class RolesOnUsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRolesOnUsersDto): Promise<RolesOnUsers> {
    return this.prisma.rolesOnUsers.create({
      data,
    });
  }

  async findAll(): Promise<RolesOnUsers[]> {
    return this.prisma.rolesOnUsers.findMany();
  }

  async findOne(userId: string, roleId: string): Promise<RolesOnUsers | null> {
    return this.prisma.rolesOnUsers.findUnique({
      where: { userId_roleId: { userId, roleId } },
    });
  }

  async update(
    userId: string,
    roleId: string,
    data: UpdateRolesOnUsersDto
  ): Promise<RolesOnUsers> {
    return this.prisma.rolesOnUsers.update({
      where: { userId_roleId: { userId, roleId } },
      data,
    });
  }

  async remove(userId: string, roleId: string): Promise<RolesOnUsers> {
    return this.prisma.rolesOnUsers.delete({
      where: { userId_roleId: { userId, roleId } },
    });
  }
}
