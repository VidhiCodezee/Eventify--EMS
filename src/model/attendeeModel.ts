import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './userModel';
import { Event } from './eventModel';

@Table
export class Attendee extends Model {
  @ForeignKey(() => User)
  user_id!: number;

  @ForeignKey(() => Event)

  event_id!: number;

  @Column({
    type: DataType.ENUM('registered', 'cancelled'),
    defaultValue: 'registered',
  })
  registration_status!: 'registered' | 'cancelled';

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Event)
  event!: Event;
}

