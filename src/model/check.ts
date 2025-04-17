import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Attendee } from './attendeeModel';

@Table({ tableName: 'CheckIn' })
export class CheckIn extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Attendee)
  @Column(DataType.INTEGER)
  attendee_id!: number;

  @Column(DataType.DATE)
  check_in_time!: Date;

  @CreatedAt
  created_at!: Date;

  @UpdatedAt
  updated_at!: Date;
}
