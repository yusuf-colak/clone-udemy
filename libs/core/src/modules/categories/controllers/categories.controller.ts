import { ReadCategoryDto } from '../dtos/readCategory.dto';
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
import { CategoriesService } from '../services/categories.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { CreateCategoryDto } from "@/core/modules/categories/dtos/createCategory.dto";
import { UpdateCategoryDto } from "@/core/modules/categories/dtos/updateCategory.dto";
import { checkAbilites } from "@/core/abilities/abilities.decorator";
import { AbilitiesGuard } from "@/core/abilities/abilities.guard";

@ApiTags('Categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
  @ApiBody({ type: CreateCategoryDto })
  @checkAbilites({ action: 'create', subject: 'Category' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() categoryData: CreateCategoryDto) {
    return this.categoriesService.create(categoryData);
  }

  @ApiOperation({ summary: 'List all categories' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadCategoryDto, isArray: true })
  @ApiException(() => UnauthorizedException, { description: 'Not authorized to view the categories' })
  @checkAbilites({ action: 'manage', subject: 'Category' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific category' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadCategoryDto })
  @ApiException(() => NotFoundException, { description: 'The category was not found' })
  @checkAbilites({ action: 'read', subject: 'Category' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} does not exist.`);
    }
    return category;
  }

  @ApiOperation({ summary: 'Update information for a specific category' })
  @ApiResponse({ status: 200, description: 'The category information has been successfully updated.' })
  @ApiException(() => NotFoundException, { description: 'The category was not found' })
  @ApiBody({ type: UpdateCategoryDto })
  @checkAbilites({ action: 'update', subject: 'Category' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() categoryData: UpdateCategoryDto) {
    return this.categoriesService.update(id, categoryData);
  }

  @ApiOperation({ summary: 'Delete a specific category' })
  @ApiResponse({ status: 200, description: 'The category has been successfully deleted.' })
  @ApiException(() => NotFoundException, { description: 'The category was not found' })
  @checkAbilites({ action: 'delete', subject: 'Category' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
  }
}
