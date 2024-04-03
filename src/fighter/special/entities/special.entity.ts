import { Fighter } from 'src/fighter/entities/fighter.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Special {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @ManyToMany(() => Fighter, (fighter) => fighter.specials)
  fighters: Fighter[];
}
