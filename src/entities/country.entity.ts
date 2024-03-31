import { AppUser } from 'src/auth/entities/auth.entity';
import { Fighter } from 'src/fighter/entities/fighter.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 5 })
  emoji: string;

  @OneToMany(() => Fighter, (fighter) => fighter.country_id)
  fighters: Fighter[];

  @OneToMany(() => AppUser, (appUser) => appUser.country_id)
  appUsers: AppUser[];
}
