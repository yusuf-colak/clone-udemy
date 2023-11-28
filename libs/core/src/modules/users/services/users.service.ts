import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/core/prisma';
import { CreateUserDto } from '@/modules/users/dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email: email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        tenant: {
          include: {
            domains: true,
          },
        },
      },
    });
  }

  async create(data: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
  async findUserByRoleName(): Promise<
    { id: string; email: string; name: string }[]
  > {
    const users = await this.prisma.user.findMany({
      where: {
        roles: {
          some: {
            role: {
              name: 'User',
            },
          },
        },
      },
    });

    // Sadece belirli bilgileri içeren objeleri döndür
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
    }));
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    // Use the getUserWithPermissions function to add permissions to each user
    return await Promise.all(
      users.map((user) => this.getUserWithPermissions(user))
    );
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return await this.getUserWithPermissions(user);
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password.toString(), 10);
    }
    return this.prisma.user.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id },
    });
  }

  async getUserWithPermissions(user: any): Promise<User> {
    // Extract permissions from user roles
    const rolePermissions = user.roles.flatMap((userRole: any) =>
      userRole.role.permissions.map((permission: any) => permission.permission)
    );

    let userOwnPermissions = [];
    // Get the user's own permissions
    if (user.permissions) {
      userOwnPermissions = user.permissions.map(
        (userPermission: any) => userPermission.permission
      );
    }

    // Combine rolePermissions and userOwnPermissions into a single array
    const allPermissions = [...rolePermissions, ...userOwnPermissions];

    // Create a new object with permissions included
    return {
      ...user,
      permissions: allPermissions,
    };
  }
}
