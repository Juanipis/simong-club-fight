import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FightService } from './fight.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/decorators/getuser.decorator';
import { AppUser } from 'src/auth/entities/auth.entity';

@Controller('fight')
@ApiTags('Fight')
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @Post()
  @ApiBearerAuth('User JWT Authentication')
  @ApiBearerAuth('Admin JWT Authentication')
  @ApiOperation({ summary: 'Create a new fight' })
  @ApiBody({ type: CreateFightDto })
  @UseGuards(AuthGuard())
  create(@getUser() user: AppUser, @Body() createFightDto: CreateFightDto) {
    return this.fightService.create(user.id, createFightDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all fights' })
  findAll() {
    return this.fightService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a fight by id' })
  findOne(@Param('id') id: string) {
    return this.fightService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth('User JWT Authentication')
  @ApiBearerAuth('Admin JWT Authentication')
  @ApiOperation({ summary: 'Delete a fight by id' })
  @UseGuards(AuthGuard())
  remove(@getUser() user: AppUser, @Param('id') id: string) {
    return this.fightService.remove(id, user);
  }
}
