import express from "express";
import { sequelize ,dbConnection } from "./config/dbConnect";
import router from "./routes/route";
import eventRouter from "./routes/eventRoute";
import atendee from "./routes/atendeeRoute";
import check from "./routes/checkRoute";

const app = express();
app.use(express.json());

app.use("/", router);

app.use("/events", eventRouter);
app.use("/attendee", atendee);
app.use("/check", check);

sequelize.sync({ force: false})
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });


app.listen(3000, async () => {
 console.log("Server is listen at port: 3000");
 await dbConnection();

});
