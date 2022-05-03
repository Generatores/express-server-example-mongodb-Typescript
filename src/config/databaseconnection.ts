import { config } from "dotenv";
import { connect } from "mongoose";

config();

export let db: VoidFunction;
let URL: string;

db = (): void => {
  URL = `${process.env.DATABASE_URL}`;
  connect(URL);
  console.log("Connection to DB successfull...");
};
