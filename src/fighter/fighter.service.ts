import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fighter } from './entities/fighter.entity';
import { Repository } from 'typeorm';
import { CreateFighterDto } from './dto/create-fighter.dto';
import { UpdateFighterDto } from './dto/update-fighter.dto';
import { Special } from 'src/special/entities/special.entity';

@Injectable()
export class FighterService {
  constructor(
    @InjectRepository(Fighter) private fighterRepository: Repository<Fighter>,
    @InjectRepository(Special) private specialRepository: Repository<Special>,
  ) {}

  async create(createFighterDto: CreateFighterDto) {
    try {
      const specials_ids = await Promise.all(
        createFighterDto.special_ids.map((id) =>
          this.specialRepository.findOneBy({ id }).then((special) => {
            if (!special) {
              throw new NotFoundException(`Special with id ${id} not found`);
            }
            return special;
          }),
        ),
      );
      const fighter = await this.fighterRepository.create({
        ...createFighterDto,
        country_id: { id: createFighterDto.country_id },
        specials: specials_ids,
      });
      await this.fighterRepository.save(fighter);
      return fighter;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findAll() {
    const fighters = await this.fighterRepository.find({
      relations: ['country_id', 'specials'],
    });

    return fighters;
  }

  async findOne(id: string) {
    const fighter = await this.fighterRepository.find({
      where: { id },
      relations: ['country_id', 'specials'],
    });
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
