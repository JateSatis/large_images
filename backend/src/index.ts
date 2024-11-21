import express from "express";
import * as dotenv from "dotenv";
import { imageRouter } from "./routes/uploadImage";

//# Testing
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", imageRouter);

const main = async () => {
  const serverPort = parseInt(process.env.SERVER_PORT!) || 3000;
  app.listen(serverPort, () => {
    console.log(`Server up and running on port ${serverPort}`);
  });
};

main();
