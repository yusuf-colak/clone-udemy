
import { ReadDomainDto} from '../dtos/readDomain.dto';
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
import { ApiTags,ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {CreateDomainDto} from "@/core/modules/domains/dtos/createDomain.dto";
import {UpdateDomainDto} from "@/core/modules/domains/dtos/updateDomain.dto";
import {checkAbilites} from "@/core/abilities/abilities.decorator";
import {AbilitiesGuard} from "@/core/abilities/abilities.guard";
import { DomainsService } from '../services/domains.service';

@ApiTags('Domains')
@ApiBearerAuth()
@Controller('domains')
export class DomainsController {
  constructor(private readonly DomainsService: DomainsService) {}

  @ApiOperation({ summary: 'Create a new domain' })
  @ApiResponse({ status: 201, description: 'The domain has been created successfully.' })
  @ApiBody({ type: CreateDomainDto })
  @checkAbilites({ action: 'create', subject: 'Domain' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() domainData: CreateDomainDto) {
    return this.DomainsService.create(domainData);
  }


  @ApiOperation({ summary: 'List all domain' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadDomainDto, isArray: true})
  @ApiException(() => UnauthorizedException, { description: 'The domain is not authorized' })
  @checkAbilites({ action: 'manage', subject: 'Domain' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.DomainsService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific domain' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadDomainDto})
  @ApiException(() => NotFoundException, { description: 'The domain was not found' })
  @checkAbilites({ action: 'read', subject: 'Domain' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const domain = await this.DomainsService.findOne(id);
    if (!domain) {
      throw new NotFoundException(`domain with ID ${id} does not exist.`);
    }
    return domain;
  }

  @ApiOperation({ summary: 'Fetch a specific domain' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadDomainDto})
  @ApiException(() => NotFoundException, { description: 'The domain was not found' })
  @Get('/url/:url')
  async findByUrl(@Param('url') url: string) {
    const domain = await this.DomainsService.findByUrl(url);
    if (!domain) {
      throw new NotFoundException(`domain with url ${url} does not exist.`);
    }
    return domain;
  }

  @ApiOperation({ summary: 'Update information for a specific domain' })
  @ApiResponse({ status: 200, description: 'domain information has been updated successfully.' })
  @ApiException(() => NotFoundException, { description: 'The domain was not found' })
  @ApiBody({ type: ReadDomainDto })
  @checkAbilites({ action: 'update', subject: 'Domain' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() domainData: UpdateDomainDto) {
    return this.DomainsService.update(id, domainData);
  }

  @ApiOperation({ summary: 'Delete a specific domain' })
  @ApiException(() => NotFoundException, { description: 'The domain was not found' })
  @ApiResponse({ status: 200, description: 'The domain has been deleted successfully.' })
  @checkAbilites({ action: 'delete', subject: 'Domain' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.DomainsService.remove(id);
  }
}

