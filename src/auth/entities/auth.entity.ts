import { MinLength } from 'class-validator';
import { Country } from 'src/entities/country.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AppUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  username: string;

  @Column('varchar', { length: 255, nullable: false })
  password: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @ManyToOne(() => Country, (country) => country.appUsers)
  @JoinColumn({ name: 'country_id' })
  country_id: Country;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  @MinLength(1)
  roles: string[];

  @Column('bool', {
    default: true,
  })
  is_active: boolean;

  @BeforeInsert()
  checkEmail() {
    this.email = this.email.toLocaleLowerCase();
  }

  @BeforeInsert()
  checkUsername() {
    this.username = this.username.toLocaleLowerCase();
  }
}
