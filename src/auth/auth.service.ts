import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUser } from './entities/auth.entity';
import { Repository } from 'typeorm/repository/Repository';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AppUser)
    private readonly userRepository: Repository<AppUser>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const user = this.userRepository.create({
        ...createAuthDto,
        country_id: { id: createAuthDto.country_id },
        password: bcrypt.hashSync(createAuthDto.password, 10),
      });
      await this.userRepository.save(user);
      const { email, username } = user;
      return { email, username };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e.detail);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginUser: LoginAuthDto) {
    try {
      const { email, password } = loginUser;
      const user = await this.userRepository.findOneBy({ email });
      if (!user) throw new UnauthorizedException('User or password incorrect');
      const isValid = bcrypt.compareSync(password, user.password);
      const { username } = user;
      if (!isValid)
        throw new UnauthorizedException('User or password incorrect');
      const jwt = this.getJwtToken({ email, username });
      return { email, jwt };
    } catch (e) {
      throw new UnauthorizedException('User or password incorrect');
    }
  }
}
