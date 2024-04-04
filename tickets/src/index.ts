import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler, NotFoundError } from "@pkorga/common";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Lishening to port 3000 !!!!!!");
  });
};

start();
