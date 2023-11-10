import { ReadChapterDto } from '../dtos/readChapter.dto';
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
import { ChaptersService } from '../services/chapters.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { CreateChapterDto } from '@/core/modules/chapters/dtos/createChapter.dto';
import { UpdateChapterDto } from '@/core/modules/chapters/dtos/updateChapter.dto';
import { checkAbilites } from '@/core/abilities/abilities.decorator';
import { AbilitiesGuard } from '@/core/abilities/abilities.guard';

@ApiTags('Chapters')
@ApiBearerAuth()
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @ApiOperation({ summary: 'Create a new chapter' })
  @ApiResponse({
    status: 201,
    description: 'The chapter has been successfully created.',
  })
  @ApiBody({ type: CreateChapterDto })
  @checkAbilites({ action: 'create', subject: 'Chapter' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() chapterData: CreateChapterDto) {
    return this.chaptersService.create(chapterData);
  }

  @ApiOperation({ summary: 'List all chapters' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadChapterDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the chapters',
  })
  @checkAbilites({ action: 'manage', subject: 'Chapter' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.chaptersService.findAll();
  }
  @ApiOperation({ summary: 'List all chapters for a specific course' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadChapterDto,
    isArray: true,
  })
  @ApiException(() => UnauthorizedException, {
    description: 'Not authorized to view the chapters for this course',
  })
  @checkAbilites({ action: 'read', subject: 'Chapter' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get('byCourse/:courseId')
  async findByCourseId(@Param('courseId') courseId: string) {
    const chapters = await this.chaptersService.findByCourseId(courseId);
    if (!chapters || chapters.length === 0) {
      throw new NotFoundException(
        `No chapters found for the course with ID ${courseId}.`
      );
    }
    return chapters;
  }
  @ApiOperation({ summary: 'Fetch a specific chapter' })
  @ApiResponse({
    status: 200,
    description: 'Successful.',
    type: ReadChapterDto,
  })
  @ApiException(() => NotFoundException, {
    description: 'The chapter was not found',
  })
  @checkAbilites({ action: 'read', subject: 'Chapter' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const chapter = await this.chaptersService.findOne(id);
    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} does not exist.`);
    }
    return chapter;
  }

  @ApiOperation({ summary: 'Update information for a specific chapter' })
  @ApiResponse({
    status: 200,
    description: 'The chapter information has been successfully updated.',
  })
  @ApiException(() => NotFoundException, {
    description: 'The chapter was not found',
  })
  @ApiBody({ type: UpdateChapterDto })
  @checkAbilites({ action: 'update', subject: 'Chapter' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() chapterData: UpdateChapterDto) {
    return this.chaptersService.update(id, chapterData);
  }

  @ApiOperation({ summary: 'Delete a specific chapter' })
  @ApiResponse({
    status: 200,
    description: 'The chapter has been successfully deleted.',
  })
  @ApiException(() => NotFoundException, {
    description: 'The chapter was not found',
  })
  @checkAbilites({ action: 'delete', subject: 'Chapter' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.chaptersService.remove(id);
  }
}
