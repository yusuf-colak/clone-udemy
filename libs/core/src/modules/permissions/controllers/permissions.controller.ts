
import { ReadPermissionDto} from '../dtos/readPermission.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
  UseFilters,
  Version,
} from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { ApiTags,ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {CreatePermissionDto} from "@/modules/permissions/dtos/createPermission.dto";
import {UpdatePermissionDto} from "@/modules/permissions/dtos/updatePermission.dto";
import {checkAbilites} from "@/core/abilities/abilities.decorator";
import {AbilitiesGuard} from "@/core/abilities/abilities.guard";

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'The permission has been created successfully.' })
  @ApiBody({ type: CreatePermissionDto })
  @checkAbilites({ action: 'create', subject: 'Permission' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() permissionData: CreatePermissionDto) {
    return this.permissionsService.create(permissionData);
  }


  @ApiOperation({ summary: 'List all permissions' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadPermissionDto, isArray: true})
  @ApiException(() => UnauthorizedException, { description: 'The permission is not authorized' })
  @checkAbilites({ action: 'manage', subject: 'Permission' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific permission' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadPermissionDto})
  @ApiException(() => NotFoundException, { description: 'The permission was not found' })
  @checkAbilites({ action: 'read', subject: 'Permission' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const permission = await this.permissionsService.findOne(id);
    if (!permission) {
      throw new NotFoundException(`permission with ID ${id} does not exist.`);
    }
    return permission;
  }

  @ApiOperation({ summary: 'Update information for a specific permission' })
  @ApiResponse({ status: 200, description: 'permission information has been updated successfully.' })
  @ApiException(() => NotFoundException, { description: 'The permission was not found' })
  @ApiBody({ type: ReadPermissionDto })
  @checkAbilites({ action: 'update', subject: 'Permission' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() permissionData: UpdatePermissionDto) {
    return this.permissionsService.update(id, permissionData);
  }

  @ApiOperation({ summary: 'Delete a specific permission' })
  @ApiException(() => NotFoundException, { description: 'The permission was not found' })
  @ApiResponse({ status: 200, description: 'The permission has been deleted successfully.' })
  @checkAbilites({ action: 'delete', subject: 'Permission' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.permissionsService.remove(id);
  }
}

