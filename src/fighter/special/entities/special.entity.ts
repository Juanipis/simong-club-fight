import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Special {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, unique: true, nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;
}
