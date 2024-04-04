import { Country } from 'src/entities/country.entity';
import { Fight } from 'src/fight/entities/fight.entity';
import { Special } from 'src/special/entities/special.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Fighter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('date')
  date_of_birth: Date;

  @ManyToOne(() => Country, (country) => country.fighters)
  @JoinColumn({ name: 'country_id' })
  country_id: Country;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 5, scale: 2 })
  height: number;

  @Column('text')
  biography: string;

  @Column('text')
  history: string;

  @Column('int')
  health: number;

  @Column('int')
  power: number;

  @Column('int')
  speed: number;

  @Column('decimal', { precision: 2, scale: 2 })
  luck: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('bool', {
    default: true,
    nullable: false,
  })
  is_active: boolean;

  @OneToMany(() => Fight, (fight) => fight.fighter1)
  fightsAsFighter1: Fight[];

  @OneToMany(() => Fight, (fight) => fight.fighter2)
  fightsAsFighter2: Fight[];

  @OneToMany(() => Fight, (fight) => fight.winner)
  wonFights: Fight[];

  @ManyToMany(() => Special, (special) => special.name)
  @JoinTable()
  specials: Special[];
}
