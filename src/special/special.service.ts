import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialDto } from './dto/create-special.dto';
import { UpdateSpecialDto } from './dto/update-special.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Special } from './entities/special.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialService {
  constructor(
    @InjectRepository(Special) private specialRepository: Repository<Special>,
  ) {}
  async create(createSpecialDto: CreateSpecialDto) {
    const newSpecial = this.specialRepository.create({
      ...createSpecialDto,
    });
    await this.specialRepository.save(newSpecial);
    const { name, description } = newSpecial;
    return { name, description };
  }

  async findAll() {
    return await this.specialRepository.find();
  }

  async findOne(id: string) {
    const special = await this.specialRepository.findOneBy({ id: id });
    return special;
  }

  async update(id: string, updateSpecialDto: UpdateSpecialDto) {
    const special = await this.specialRepository.preload({
      id: id,
      ...updateSpecialDto,
    });
    if (!special) {
      throw new NotFoundException('Special not found');
    }
    await this.specialRepository.save(special);
  }

  async remove(id: string) {
    const special = await this.specialRepository.findOneBy({ id: id });
    if (!special) {
      throw new NotFoundException('Special not found');
    }
    await this.specialRepository.remove(special);
    return 'Special' + special.name + ' has been deleted successfully.';
  }
}
