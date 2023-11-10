
import { ReadUserDto} from '../dtos/readUser.dto';
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
import { UsersService } from '../services/users.service';
import { ApiTags,ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {CreateUserDto} from "@/modules/users/dtos/createUser.dto";
import {AbilitiesGuard} from "@/core/abilities/abilities.guard";
import {checkAbilites} from "@/core/abilities/abilities.decorator";
import {UpdateUserDto} from "@/modules/users/dtos/updateUser.dto";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been created successfully.' })
  @ApiBody({ type: CreateUserDto })
  @checkAbilites({ action: 'create', subject: 'User' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }


  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadUserDto, isArray: true})
  @ApiException(() => UnauthorizedException, { description: 'The user is not authorized' })
  @checkAbilites({ action: 'manage', subject: 'User' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific user' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadUserDto})
  @ApiException(() => NotFoundException, { description: 'The user was not found' })
  @checkAbilites({ action: 'read', subject: 'User' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist.`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Update information for a specific user' })
  @ApiResponse({ status: 200, description: 'User information has been updated successfully.' })
  @ApiException(() => NotFoundException, { description: 'The user was not found' })
  @ApiBody({ type: ReadUserDto })
  @checkAbilites({ action: 'update', subject: 'User' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return this.usersService.update(id, userData);
  }

  @ApiOperation({ summary: 'Delete a specific user' })
  @ApiException(() => NotFoundException, { description: 'The user was not found' })
  @ApiResponse({ status: 200, description: 'The user has been deleted successfully.' })
  @checkAbilites({ action: 'delete', subject: 'User' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}

