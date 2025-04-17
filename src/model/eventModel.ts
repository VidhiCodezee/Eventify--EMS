import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './userModel';

@Table
export class Event extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_time!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_time!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @ForeignKey(() => User)
   created_by!: number;

  @BelongsTo(() => User)
  user!: User;
}

