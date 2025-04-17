
import { Sequelize } from "sequelize-typescript";
import { User } from "../model/userModel";
import { Event } from "../model/eventModel";
import { Attendee } from "../model/attendeeModel";
import { CheckIn } from "../model/check";
export const sequelize = new Sequelize({
  database: "eventify",
  username: "postgres",
  password: "123",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  models: [User, Event, Attendee,CheckIn],
  logging: false,
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (error) {
    console.error("Not connect to DB:", error);
  }
};
