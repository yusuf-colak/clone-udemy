import { ReadCourseDto } from '../dtos/readCourse.dto';
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
import { CoursesService } from '../services/courses.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { CreateCourseDto } from "@/core/modules/courses/dtos/createCourse.dto";
import { UpdateCourseDto } from "@/core/modules/courses/dtos/updateCourse.dto";
import { checkAbilites } from "@/core/abilities/abilities.decorator";
import { AbilitiesGuard } from "@/core/abilities/abilities.guard";

@ApiTags('Courses')
@ApiBearerAuth()
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.' })
  @ApiBody({ type: CreateCourseDto })
  @checkAbilites({ action: 'create', subject: 'Course' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() courseData: CreateCourseDto) {
    return this.coursesService.create(courseData);
  }

  @ApiOperation({ summary: 'List all courses' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadCourseDto, isArray: true })
  @ApiException(() => UnauthorizedException, { description: 'Not authorized to view the courses' })
  @checkAbilites({ action: 'manage', subject: 'Course' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific course' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadCourseDto })
  @ApiException(() => NotFoundException, { description: 'The course was not found' })
  @checkAbilites({ action: 'read', subject: 'Course' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.coursesService.findOne(id);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} does not exist.`);
    }
    return course;
  }

  @ApiOperation({ summary: 'Update information for a specific course' })
  @ApiResponse({ status: 200, description: 'The course information has been successfully updated.' })
  @ApiException(() => NotFoundException, { description: 'The course was not found' })
  @ApiBody({ type: UpdateCourseDto })
  @checkAbilites({ action: 'update', subject: 'Course' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() courseData: UpdateCourseDto) {
    return this.coursesService.update(id, courseData);
  }

  @ApiOperation({ summary: 'Delete a specific course' })
  @ApiResponse({ status: 200, description: 'The course has been successfully deleted.' })
  @ApiException(() => NotFoundException, { description: 'The course was not found' })
  @checkAbilites({ action: 'delete', subject: 'Course' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.coursesService.remove(id);
  }
}
