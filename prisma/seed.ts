import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

const superadminRoleId = randomUUID();
const adminRoleId = randomUUID();
const userRoleId = randomUUID();

const tenantId = randomUUID();

export const roles = [
  {
    id: superadminRoleId,
    name: 'Superadmin',
  },
  {
    id: adminRoleId,
    name: 'Admin',
  },
  {
    id: userRoleId,
    name: 'User',
  },
];

function generateAdminPermissions(subject: string) {
  return [
    {
      id: randomUUID(),
      action: 'manage',
      subject,
    },
    {
      id: randomUUID(),
      action: 'create',
      subject,
    },
    {
      id: randomUUID(),
      action: 'read',
      subject,
    },
    {
      id: randomUUID(),
      action: 'update',
      subject,
    },
    {
      id: randomUUID(),
      action: 'delete',
      subject,
    },
  ];
}

function generateUserPermissionsSorgu(subject: string) {
  return [
    {
      id: randomUUID(),
      action: 'manage',
      subject,
    },
  ];
}

function generateUserPermissionsManageUpdate(subject: string) {
  return [
    {
      id: randomUUID(),
      action: 'manage',
      subject,
    },
    {
      id: randomUUID(),
      action: 'create',
      subject,
    },
    {
      id: randomUUID(),
      action: 'read',
      subject,
    },
    {
      id: randomUUID(),
      action: 'update',
      subject,
    },
  ];
}
export const permissions = [
  ...generateAdminPermissions('User'),
  ...generateAdminPermissions('Role'),
  ...generateAdminPermissions('Permission'),
  ...generateAdminPermissions('RolesOnUsers'),
  ...generateAdminPermissions('Tenant'),
  ...generateAdminPermissions('Domain'),
  ...generateAdminPermissions('Chapter'),
  ...generateAdminPermissions('Role'),
  ...generateAdminPermissions('Course'),
  ...generateAdminPermissions('Category'),
  ...generateAdminPermissions('Attachment'),
  ...generateAdminPermissions('Tracking'),
  ...generateUserPermissionsSorgu('Course'),
  ...generateUserPermissionsSorgu('Chapter'),
  ...generateUserPermissionsSorgu('Attachment'),
  ...generateUserPermissionsSorgu('Category'),
  ...generateUserPermissionsManageUpdate('Tracking'),
];

async function generateUser(name: string, email: string, password: string) {
  return {
    id: randomUUID(),
    name,
    email,
    password: await bcrypt.hash(password, 10),
  };
}

async function users() {
  return [
    await generateUser('Superadmin', 'superadmin@microprefix', 'superadmin'),
    await generateUser('Admin', 'admin@microprefix', 'admin'),
    await generateUser('User', 'user@microprefix', 'user'),
  ];
}

async function assignRoleToUser(email: string, roleId: string) {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      roles: {
        create: {
          role: {
            connect: {
              id: roleId,
            },
          },
        },
      },
      tenantId: tenantId,
    },
  });
}

async function assignPermissionsToRole(
  subject: string,
  roleId: string,
  onlyOwn: boolean = false
) {
  const permissions = await prisma.permission.findMany({
    where: {
      subject,
    },
  });

  await prisma.role.update({
    where: {
      id: roleId,
    },
    data: {
      permissions: {
        create: permissions.map((permission) => ({
          onlyOwn,
          permission: {
            connect: {
              id: permission.id,
            },
          },
        })),
      },
    },
  });
}
export const categories = [
  { name: 'Computer Science' },
  { name: 'Music' },
  { name: 'Fitness' },
  { name: 'Photography' },
  { name: 'Accounting' },
  { name: 'Engineering' },
  { name: 'Filming' },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: roles,
  });

  await prisma.permission.createMany({
    data: permissions,
  });

  async function createCategories() {
    return prisma.category.createMany({
      data: categories.map((category) => ({
        name: category.name,
      })),
    });
  }

  await prisma.user.createMany({
    data: await users(),
  });

  await prisma.tenant.create({
    data: {
      id: tenantId,
      name: 'Default',
    },
  });

  await prisma.domain.create({
    data: {
      id: randomUUID(),
      url: 'localhost:4200',
      tenantId: tenantId,
    },
  });

  await assignRoleToUser('superadmin@microprefix', superadminRoleId);
  await assignRoleToUser('admin@microprefix', adminRoleId);
  await assignRoleToUser('user@microprefix', userRoleId);

  await assignPermissionsToRole('User', adminRoleId);
  await assignPermissionsToRole('RolesOnUsers', adminRoleId);
  await assignPermissionsToRole('Course', adminRoleId);
  await assignPermissionsToRole('Chapter', adminRoleId);
  await assignPermissionsToRole('Role', adminRoleId);
  await assignPermissionsToRole('Category', adminRoleId);
  await assignPermissionsToRole('Attachment', adminRoleId);
  await assignPermissionsToRole('Tracking', adminRoleId);

  await assignPermissionsToRole('User', userRoleId, true);
  await assignPermissionsToRole('Course', userRoleId, true);
  await assignPermissionsToRole('Chapter', userRoleId, true);
  await assignPermissionsToRole('Tracking', userRoleId, true);
  await assignPermissionsToRole('Attachment', userRoleId, true);

  await createCategories();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
