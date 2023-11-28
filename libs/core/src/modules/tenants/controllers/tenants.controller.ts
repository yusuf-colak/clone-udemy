import { ReadTenantDto } from '../dtos/readTenant.dto';
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
import { TenantsService } from '../services/tenants.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { CreateTenantDto } from '@/core/modules/tenants/dtos/createTenant.dto';
import { UpdateTenantDto } from '@/core/modules/tenants/dtos/updateTenant.dto';
import { checkAbilites } from '@/core/abilities/abilities.decorator';
import { AbilitiesGuard } from '@/core/abilities/abilities.guard';

@ApiTags('Tenants')
@ApiBearerAuth()
@Controller('tenants')
export class TenantsController {
  constructor(private readonly TenantsService: TenantsService) {}

  @ApiOperation({ summary: 'Create a new tenant' })
  @ApiResponse({
    status: 201,
    description: 'The tenant has been created successfully.',
  })
  @ApiBody({ type: CreateTenantDto })
  @checkAbilites({ action: 'create', subject: 'Tenant' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() tenantData: CreateTenantDto) {
    return this.TenantsService.create(tenantData);
  }

  @ApiOperation({ summary: 'List all tenant' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadTenantDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'The tenant is not authorized',
  })
  @checkAbilites({ action: 'manage', subject: 'Tenant' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.TenantsService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific tenant' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadTenantDto })
  @ApiException(() => NotFoundException, {
    description: 'The tenant was not found',
  })
  @checkAbilites({ action: 'read', subject: 'Tenant' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tenant = await this.TenantsService.findOne(id);
    if (!tenant) {
      throw new NotFoundException(`tenant with ID ${id} does not exist.`);
    }
    return tenant;
  }

  @ApiOperation({ summary: 'Update information for a specific tenant' })
  @ApiResponse({
    status: 200,
    description: 'tenant information has been updated successfully.',
  })
  @ApiException(() => NotFoundException, {
    description: 'The tenant was not found',
  })
  @ApiBody({ type: ReadTenantDto })
  @checkAbilites({ action: 'update', subject: 'Tenant' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() tenantData: UpdateTenantDto) {
    return this.TenantsService.update(id, tenantData);
  }

  @ApiOperation({ summary: 'Delete a specific tenant' })
  @ApiException(() => NotFoundException, {
    description: 'The tenant was not found',
  })
  @ApiResponse({
    status: 200,
    description: 'The tenant has been deleted successfully.',
  })
  @checkAbilites({ action: 'delete', subject: 'Tenant' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.TenantsService.remove(id);
  }
}
