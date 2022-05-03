import { model, Schema } from "mongoose";
import { iData } from "../config/interfaces";

const DataSchema = new Schema<iData>({
  Value1: {
    type: String,
    required: true,
  },
  Value2: {
    type: String,
    required: true,
  },
});

export const DataModel = model<iData>("Data", DataSchema);
