import { ReadTrackingDto } from '../dtos/readTracking.dto';
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
  BadRequestException,
} from '@nestjs/common';
import { TrackingsService } from '../services/trackings.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { CreateTrackingDto } from '@/core/modules/trackings/dtos/createTracking.dto';
import { UpdateTrackingDto } from '@/core/modules/trackings/dtos/updateTracking.dto';
import { checkAbilites } from '@/core/abilities/abilities.decorator';
import { AbilitiesGuard } from '@/core/abilities/abilities.guard';

@ApiTags('Trackings')
@ApiBearerAuth()
@Controller('trackings')
export class TrackingsController {
  constructor(private readonly trackingsService: TrackingsService) {}

  @ApiOperation({ summary: 'Create a new tracking' })
  @ApiResponse({
    status: 201,
    description: 'The tracking has been successfully created.',
  })
  @ApiBody({ type: CreateTrackingDto })
  @checkAbilites({ action: 'create', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() trackingData: CreateTrackingDto) {
    return this.trackingsService.create(trackingData);
  }

  @ApiOperation({ summary: 'List all trackings' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadTrackingDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the trackings',
  })
  @checkAbilites({ action: 'manage', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.trackingsService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific tracking' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadTrackingDto,
  })
  @ApiException(() => NotFoundException, {
    description: 'The tracking was not found',
  })
  @checkAbilites({ action: 'read', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const tracking = await this.trackingsService.findOne(id);
    if (!tracking) {
      throw new NotFoundException(`Tracking with ID ${id} does not exist.`);
    }
    return tracking;
  }

  @ApiOperation({ summary: 'Update information for a specific tracking' })
  @ApiResponse({
    status: 200,
    description: 'The tracking information has been successfully updated.',
  })
  @ApiException(() => NotFoundException, {
    description: 'The tracking was not found',
  })
  @ApiBody({ type: UpdateTrackingDto })
  @checkAbilites({ action: 'update', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() trackingData: UpdateTrackingDto
  ) {
    return this.trackingsService.update(id, trackingData);
  }

  @ApiOperation({ summary: 'Delete a specific tracking' })
  @ApiResponse({
    status: 200,
    description: 'The tracking has been successfully deleted.',
  })
  @ApiException(() => NotFoundException, {
    description: 'The tracking was not found',
  })
  @checkAbilites({ action: 'delete', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.trackingsService.remove(id);
  }

  @ApiOperation({ summary: 'List all trackings for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadTrackingDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the trackings',
  })
  @checkAbilites({ action: 'manage', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.trackingsService.findAllByUserId(userId);
  }

  @ApiOperation({ summary: 'List all trackings for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadTrackingDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the trackings',
  })
  @checkAbilites({ action: 'manage', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get('user/:userId/courseId/:courseId')
  findCourseIdAnduserId(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string
  ) {
    return this.trackingsService.findCourseIdAnduserId(userId, courseId);
  }

  @ApiOperation({ summary: 'List all trackings for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadTrackingDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the trackings',
  })
  @checkAbilites({ action: 'manage', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get('user/:userId/lenght')
  countAllByUserId(@Param('userId') userId: string) {
    return this.trackingsService.countAllByUserId(userId);
  }

  @ApiOperation({ summary: 'List all trackings for a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadTrackingDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the trackings',
  })
  @checkAbilites({ action: 'manage', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get('user/:userId/lenght/courseIds')
  countCourseIds(@Param('userId') userId: string) {
    return this.trackingsService.countCourseIds(userId);
  }

  @ApiOperation({ summary: 'Create a new tracking...' })
  @ApiResponse({
    status: 201,
    description: 'The tracking has been successfully created...',
  })
  @ApiBody({ type: CreateTrackingDto })
  @checkAbilites({ action: 'create', subject: 'Tracking' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post('/controlAndCreate')
  async createAA(@Body() data: CreateTrackingDto) {
    return await this.trackingsService.createFind(data);
  }
}
