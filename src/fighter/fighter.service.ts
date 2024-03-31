import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { Repository } from 'typeorm';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
  ) {}

  async create(createFighterDto: CreateFighterDto) {
    const newFighter = this.fighterRepository.create({
      ...createFighterDto,
      country_id: { id: createFighterDto.country_id },
    });
    await this.fighterRepository.save(newFighter);
    const { name, date_of_birth } = newFighter;
    return { name, date_of_birth };
  }

  async findAll() {
    const fighters = await this.fighterRepository.find({
      relations: ['country_id'],
    });
    return fighters;
  }

  async findOne(id: string) {
    const fighter = await this.fighterRepository.findOneBy({ id: id });
    return fighter;
  }

  async update(id: string, updateFighterDto: UpdateFighterDto) {
    const fighter = await this.fighterRepository.preload({
      id: id,
      ...updateFighterDto,
      country_id: { id: updateFighterDto.country_id },
    });
    if (!fighter) {
      throw new NotFoundException('Fighter not found');
    }
    await this.fighterRepository.save(fighter);
    return fighter;
  }

  async remove(id: string) {
    const fighter = await this.fighterRepository.findOneBy({ id: id });
    if (!fighter) {
      throw new NotFoundException('Fighter not found');
    }
    await this.fighterRepository.remove(fighter);
    return 'Fighter' + fighter.name + ' has been deleted successfully.';
  }
}
