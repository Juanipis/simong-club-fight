import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FighterService } from './fighter.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoleGuardGuard } from 'src/auth/guards/use-role-guard.guard';

@Controller('fighter')
@ApiTags('fighter')
export class FighterController {
  constructor(private readonly fighterService: FighterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new fighter' })
  @ApiBearerAuth('User JWT Authentication')
  @ApiBearerAuth('Admin JWT Authentication')
  @ApiResponse({
    status: 201,
    description: 'The fighter has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateFighterDto })
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  create(@Body() createFighterDto: CreateFighterDto) {
    return this.fighterService.create(createFighterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fighters' })
  findAll() {
    return this.fighterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a fighter by id' })
  findOne(@Param('id') id: string) {
    return this.fighterService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a fighter by id' })
  @ApiBearerAuth('User JWT Authentication')
  @ApiBearerAuth('Admin JWT Authentication')
  @ApiResponse({
    status: 200,
    description: 'The fighter has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Fighter not found.' })
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  remove(@Param('id') id: string) {
    return this.fighterService.remove(id);
  }
}