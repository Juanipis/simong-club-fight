import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateFightDto } from './dto/create-fight.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from './entities/fight.entity';
import { Fighter } from 'src/fighter/entities/fighter.entity';
import { AppUser } from 'src/auth/entities/auth.entity';

@Injectable()
export class FightService {
  constructor(
    @InjectRepository(Fight) private fightRepository: Repository<Fight>,
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
  ) {}

  calculateWinner(fighter1: Fighter, fighter2: Fighter) {
    const weights = {
      health: 3,
      power: 4,
      speed: 2,
      luck: 1,
    };
    const fighter1Score =
      fighter1.health * weights.health +
      fighter1.power * weights.power +
      fighter1.speed * weights.speed +
      fighter1.luck * weights.luck;
    const fighter2Score =
      fighter2.health * weights.health +
      fighter2.power * weights.power +
      fighter2.speed * weights.speed +
      fighter2.luck * weights.luck;
    const totalScore = fighter1Score + fighter2Score;
    const fighter1Chance = fighter1Score / totalScore;

    const random = Math.random();
    if (random < fighter1Chance) {
      return fighter1;
    } else {
      return fighter2;
    }
  }

  async create(user_id: string, createFightDto: CreateFightDto) {
    if (createFightDto.fighter1_id === createFightDto.fighter2_id) {
      throw new UnprocessableEntityException('Fighters must be different');
    }
    const fighter1 = await this.fighterRepository.findOneBy({
      id: createFightDto.fighter1_id,
    });
    const fighter2 = await this.fighterRepository.findOneBy({
      id: createFightDto.fighter2_id,
    });

    if (!fighter1 || !fighter2) {
      throw new UnprocessableEntityException('Fighters not found');
    }

    const winner = this.calculateWinner(fighter1, fighter2);

    const newFight = this.fightRepository.create({
      user: { id: user_id },
      fighter1: { id: createFightDto.fighter1_id },
      fighter2: { id: createFightDto.fighter2_id },
      winner: { id: winner.id },
    });
    await this.fightRepository.save(newFight);
    return newFight;
  }

  async findOne(id: string) {
    const fight = await this.fightRepository.findOne({
      where: { id },
      relations: ['fighter1', 'fighter2', 'winner'],
    });
    return fight;
  }

  async findAll() {
    const fights = await this.fightRepository.find({
      relations: ['winner'],
    });
    return fights;
  }

  async remove(id: string, user: AppUser) {
    const fight = await this.fightRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!fight) {
      throw new UnprocessableEntityException('Fight not found');
    }
    if (fight.user.id !== user.id && user.roles.indexOf('admin') === -1) {
      throw new UnprocessableEntityException(
        'You are not allowed to delete this fight',
      );
    }
    await this.fightRepository.remove(fight);
    return 'Fight ' + id + ' has been deleted successfully.';
  }
}
