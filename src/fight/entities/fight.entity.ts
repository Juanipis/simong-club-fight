import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AppUser } from 'src/auth/entities/auth.entity';
import { Fighter } from 'src/fighter/entities/fighter.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@ValidatorConstraint({ name: 'IsWinner', async: false })
class IsWinner implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as Fight;
    return (
      value &&
      (value.id === object.fighter1.id || value.id === object.fighter2.id)
    );
  }

  defaultMessage() {
    return 'Winner must be either fighter1 or fighter2';
  }
}

@Entity('fight')
export class Fight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'fighter1_id' })
  fighter1: Fighter;

  @ManyToOne(() => Fighter)
  @JoinColumn({ name: 'fighter2_id' })
  fighter2: Fighter;

  @ManyToOne(() => Fighter, { nullable: true })
  @JoinColumn({ name: 'winner_id' })
  @Validate(IsWinner)
  winner: Fighter;

  @ManyToOne(() => AppUser)
  @JoinColumn({ name: 'user_id' })
  user: AppUser;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Fight, (fight) => fight.user)
  fights: Fight[];
}
