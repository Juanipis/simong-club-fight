import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SpecialService } from './special.service';
import { CreateSpecialDto } from './dto/create-special.dto';
import { UpdateSpecialDto } from './dto/update-special.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from 'src/auth/guards/use-role-guard.guard';

@Controller('special')
@ApiTags('Special of fighters 🥊')
export class SpecialController {
  constructor(private readonly specialService: SpecialService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new special' })
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  create(@Body() createSpecialDto: CreateSpecialDto) {
    return this.specialService.create(createSpecialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all specials' })
  findAll() {
    return this.specialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a special by id' })
  findOne(@Param('id') id: string) {
    return this.specialService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  @ApiOperation({ summary: 'Update a special by id' })
  update(@Param('id') id: string, @Body() updateSpecialDto: UpdateSpecialDto) {
    return this.specialService.update(id, updateSpecialDto);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  @ApiOperation({ summary: 'Remove a special by id' })
  remove(@Param('id') id: string) {
    return this.specialService.remove(id);
  }
}
