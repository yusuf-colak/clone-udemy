import { ReadAttachmentDto } from '../dtos/readAttachment.dto';
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
import { AttachmentsService } from '../services/attachments.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { CreateAttachmentDto } from "@/core/modules/attachments/dtos/createAttachment.dto";
import { UpdateAttachmentDto } from "@/core/modules/attachments/dtos/updateAttachment.dto";
import { checkAbilites } from "@/core/abilities/abilities.decorator";
import { AbilitiesGuard } from "@/core/abilities/abilities.guard";

@ApiTags('Attachments')
@ApiBearerAuth()
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @ApiOperation({ summary: 'Create a new attachment' })
  @ApiResponse({ status: 201, description: 'The attachment has been successfully created.' })
  @ApiBody({ type: CreateAttachmentDto })
  @checkAbilites({ action: 'create', subject: 'Attachment' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Post()
  create(@Body() attachmentData: CreateAttachmentDto) {
    return this.attachmentsService.create(attachmentData);
  }

  @ApiOperation({ summary: 'List all attachments' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadAttachmentDto, isArray: true })
  @ApiException(() => UnauthorizedException, { description: 'Not authorized to view the attachments' })
  @checkAbilites({ action: 'manage', subject: 'Attachment' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get()
  findAll() {
    return this.attachmentsService.findAll();
  }

  @ApiOperation({ summary: 'Fetch a specific attachment' })
  @ApiResponse({ status: 200, description: 'Successful.', type: ReadAttachmentDto })
  @ApiException(() => NotFoundException, { description: 'The attachment was not found' })
  @checkAbilites({ action: 'read', subject: 'Attachment' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const attachment = await this.attachmentsService.findOne(id);
    if (!attachment) {
      throw new NotFoundException(`Attachment with ID ${id} does not exist.`);
    }
    return attachment;
  }

  @ApiOperation({ summary: 'Update information for a specific attachment' })
  @ApiResponse({ status: 200, description: 'The attachment information has been successfully updated.' })
  @ApiException(() => NotFoundException, { description: 'The attachment was not found' })
  @ApiBody({ type: UpdateAttachmentDto })
  @checkAbilites({ action: 'update', subject: 'Attachment' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() attachmentData: UpdateAttachmentDto) {
    return this.attachmentsService.update(id, attachmentData);
  }

  @ApiOperation({ summary: 'Delete a specific attachment' })
  @ApiResponse({ status: 200, description: 'The attachment has been successfully deleted.' })
  @ApiException(() => NotFoundException, { description: 'The attachment was not found' })
  @checkAbilites({ action: 'delete', subject: 'Attachment' })
  @UseGuards(JwtAuthGuard, AbilitiesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.attachmentsService.remove(id);
  }
}
