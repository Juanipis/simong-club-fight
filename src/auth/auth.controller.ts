import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './decorators/getuser.decorator';
import { UseRoleGuardGuard } from './guards/use-role-guard.guard';
import { AppUser } from './entities/auth.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth ')
@ApiTags('auth 🔐')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'Logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Get('private')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Get private data' })
  @ApiResponse({
    status: 200,
    description: 'Private data retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard())
  dataUser(@getUser() user: AppUser) {
    const { email, username, country_id } = user;
    return { email, username, country_id };
  }
  @Get('private2')
  @ApiBearerAuth('User JWT Authentication')
  @ApiOperation({ summary: 'Get private data from admin' })
  @UseGuards(AuthGuard(), UseRoleGuardGuard)
  dataAdmin(@getUser() user: AppUser) {
    return user;
  }
}
