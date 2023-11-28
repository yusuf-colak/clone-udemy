import { ReadRolesOnUsersDto } from '../dtos/readRolesOnUsers.dto';
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
import { RolesOnUsersService } from '../services/RolesOnUsers.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { CreateRolesOnUsersDto } from '../dtos/createRolesOnUsers.dto';
import { UpdateRolesOnUsersDto } from '../dtos/updateRolesOnUsers.dto';
import { checkAbilites } from '@/core/abilities/abilities.decorator';
import { AbilitiesGuard } from '@/core/abilities/abilities.guard';

@ApiTags('RolesOnUsers')
@ApiBearerAuth()
@Controller('rolesonusers')
export class RolesOnUsersController {
  constructor(private readonly rolesOnUsersService: RolesOnUsersService) {}

  @ApiOperation({ summary: 'Create a new rolesonusers' })
  @ApiResponse({
    status: 201,
    description: 'The rolesonusers has been successfully created.',
  })
  @ApiBody({ type: CreateRolesOnUsersDto })
  @checkAbilites({ action: 'create', subject: 'RolesOnUsers' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() rolesOnUsersData: CreateRolesOnUsersDto) {
    return this.rolesOnUsersService.create(rolesOnUsersData);
  }

  @ApiOperation({ summary: 'List all rolesonusers' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadRolesOnUsersDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the rolesonusers',
  })
  @checkAbilites({ action: 'manage', subject: 'RolesOnUsers' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.rolesOnUsersService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific rolesonusers' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadRolesOnUsersDto,
  })
  @ApiException(() => NotFoundException, {
    description: 'The rolesonusers was not found',
  })
  @checkAbilites({ action: 'read', subject: 'RolesOnUsers' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':userId/:roleId')
  async findOne(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string
  ) {
    const rolesOnUsers = await this.rolesOnUsersService.findOne(userId, roleId);
    if (!rolesOnUsers) {
      throw new NotFoundException(
        `RolesOnUsers with userId ${userId} and roleId ${roleId} does not exist.`
      );
    }
    return rolesOnUsers;
  }

  @ApiOperation({ summary: 'Update information for a specific rolesonusers' })
  @ApiResponse({
    status: 200,
    description: 'The rolesonusers information has been successfully updated.',
  })
  @ApiException(() => NotFoundException, {
    description: 'The rolesonusers was not found',
  })
  @ApiBody({ type: UpdateRolesOnUsersDto })
  @checkAbilites({ action: 'update', subject: 'RolesOnUsers' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':userId/:roleId')
  async update(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
    @Body() rolesOnUsersData: UpdateRolesOnUsersDto
  ) {
    return this.rolesOnUsersService.update(userId, roleId, rolesOnUsersData);
  }

  @ApiOperation({ summary: 'Delete a specific rolesonusers' })
  @ApiResponse({
    status: 200,
    description: 'The rolesonusers has been successfully deleted.',
  })
  @ApiException(() => NotFoundException, {
    description: 'The rolesonusers was not found',
  })
  @checkAbilites({ action: 'delete', subject: 'RolesOnUsers' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':userId/:roleId')
  async remove(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string
  ) {
    await this.rolesOnUsersService.remove(userId, roleId);
  }
}
