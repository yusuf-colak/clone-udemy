
import { ReadRoleDto} from '../dtos/readRole.dto';
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
import { RolesService } from '../services/roles.service';
import { ApiTags,ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {CreateRoleDto} from "@/modules/roles/dtos/createRole.dto";
import {UpdateRoleDto} from "@/modules/roles/dtos/updateRole.dto";
import {checkAbilites} from "@/core/abilities/abilities.decorator";
import {AbilitiesGuard} from "@/core/abilities/abilities.guard";

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'The role has been created successfully.' })
  @ApiBody({ type: CreateRoleDto })
  @checkAbilites({ action: 'create', subject: 'Role' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() roleData: CreateRoleDto) {
    return this.rolesService.create(roleData);
  }


  @ApiOperation({ summary: 'List all roles' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadRoleDto, isArray: true})
  @ApiException(() => UnauthorizedException, { description: 'The role is not authorized' })
  @checkAbilites({ action: 'manage', subject: 'Role' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific role' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadRoleDto})
  @ApiException(() => NotFoundException, { description: 'The role was not found' })
  @checkAbilites({ action: 'read', subject: 'Role' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} does not exist.`);
    }
    return role;
  }

  @ApiOperation({ summary: 'Update information for a specific role' })
  @ApiResponse({ status: 200, description: 'Role information has been updated successfully.' })
  @ApiException(() => NotFoundException, { description: 'The role was not found' })
  @ApiBody({ type: ReadRoleDto })
  @checkAbilites({ action: 'update', subject: 'Role' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() roleData: UpdateRoleDto) {
    return this.rolesService.update(id, roleData);
  }

  @ApiOperation({ summary: 'Delete a specific role' })
  @ApiException(() => NotFoundException, { description: 'The role was not found' })
  @ApiResponse({ status: 200, description: 'The role has been deleted successfully.' })
  @checkAbilites({ action: 'delete', subject: 'Role' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.rolesService.remove(id);
  }
}

