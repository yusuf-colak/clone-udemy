import { Module } from '@nestjs/common';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { UsersService } from '@/modules/users/services/users.service';
import { PrismaService } from '@/core/prisma';
import { RolesController } from '@/modules/roles/controllers/roles.controller';
import { RolesService } from '@/modules/roles/services/roles.service';
import { PermissionsController } from '@/modules/permissions/controllers/permissions.controller';
import { PermissionsService } from '@/modules/permissions/services/permissions.service';
import { TenantsController } from '@/core/modules/tenants/controllers/tenants.controller';
import { TenantsService } from '@/core/modules/tenants/services/tenants.service';
import { DomainsController } from '@/core/modules/domains/controllers/domains.controller';
import { DomainsService } from '@/core/modules/domains/services/domains.service';
import { CoursesController } from '../modules/courses/controllers/courses.controller';
import { CoursesService } from '../modules/courses/services/courses.service';
import { CategoriesController } from '../modules/categories/controllers/categories.controller';
import { CategoriesService } from '../modules/categories/services/categories.service';
import { ChaptersController } from '../modules/chapters/controllers/chapters.controller';
import { ChaptersService } from '../modules/chapters/services/chapters.service';
import { AttachmentsController } from '../modules/attachments/controllers/attachments.controller';
import { AttachmentsService } from '../modules/attachments/services/attachments.service';

@Module({
  controllers: [
    UsersController,
    RolesController,
    PermissionsController,
    TenantsController,
    DomainsController,
    CoursesController,
    CategoriesController,
    ChaptersController,
    AttachmentsController,
  ],
  providers: [
    PrismaService,
    UsersService,
    RolesService,
    PermissionsService,
    TenantsService,
    DomainsService,
    CoursesService,
    CategoriesService,
    ChaptersService,
    AttachmentsService,
  ],
  exports: [],
})
export class CoreModule {}
