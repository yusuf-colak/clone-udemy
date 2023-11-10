import { User, Role } from '@prisma/client';
import { Reflector } from '@nestjs/core';

import { CHECK_ABILITY, RequiredRule } from './abilities.decorator';

import {
  createMongoAbility,
  ForbiddenError,
  MongoAbility,
  RawRuleOf,
  subject,
} from '@casl/ability';

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/core/prisma';

export type AppAbility = MongoAbility;

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  createAbility = (rules: RawRuleOf<AppAbility>[]) =>
    createMongoAbility<AppAbility>(rules);

  async isSuperadmin(userId: string) {
    const userRoles: any = await this.prisma.rolesOnUsers.findMany({
      where: { userId },
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
    });

    return userRoles?.some((role: any) => role.role.name === 'Superadmin');
  }

  async getUserPermissions(userId: string) {
    // Get the user's roles
    const userRoles = await this.prisma.rolesOnUsers.findMany({
      where: { userId },
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
    });

    // Extract permissions from the user's roles
    const rolePermissions = userRoles.flatMap((userRole) =>
      userRole.role.permissions.map((permission) => permission.permission)
    );

    // Get the user's own permissions
    const userOwnPermissions = await this.prisma.permissionsOnUsers.findMany({
      where: { userId },
      include: { permission: true },
    });

    // Extract user's own permissions
    const userOwnPermissionsList = userOwnPermissions.map(
      (userPermission) => userPermission.permission
    );

    // Combine the rolePermissions and userOwnPermissions into a single array
    return [...rolePermissions, ...userOwnPermissionsList];
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules: any =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const currentUser = context.switchToHttp().getRequest().user;

    const userPermissions = await this.getUserPermissions(currentUser.id);

    console.log(await this.isSuperadmin(currentUser.id));

    if (await this.isSuperadmin(currentUser.id)) {
      return true;
    }

    try {
      const ability = this.createAbility(Object(userPermissions));

      for await (const rule of rules) {
        ForbiddenError.from(ability)
          .setMessage('You are not allowed to perform this action')
          .throwUnlessCan(rule.action, subject(rule.subject, {}));
      }
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }
}
