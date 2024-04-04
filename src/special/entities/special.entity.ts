import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Special {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;
}
