import express, { Router, Request, Response, NextFunction } from "express";
import { DataModel } from "../models/data";
import { iData } from "../config/interfaces";

export const DataRouter: Router = express.Router();

DataRouter.get(
  "/",

  async (req: any, res: Response): Promise<void> => {
    try {
      const allDataModels: Array<iData> = await DataModel.find();
      console.log("Main GET successfull...");
      res.status(201).json(allDataModels);
    } catch (err: any) {
      console.log(`message: ${err.message}`);
      res.status(500).json({ message: err.message });
    }
  }
);

DataRouter.get(
  "/:id",

  getDataModel,
  async (req: Request, res: any): Promise<void> => {
    console.log("Specific GET successfull...");
    res.status(201).json(res.functionDataModel);
  }
);

DataRouter.post(
  "/",

  async (req: Request, res: Response): Promise<void> => {
    const seqvalue: number = (await DataModel.find().count()) + 400;
    const DataModelReceived = new DataModel({
      Value1: req.body.Value1,
      Value2: req.body.Value2,
    });
    try {
      const newDataModel: iData = await DataModelReceived.save();
      console.log("POST successfull...");
      res.status(201).json(newDataModel);
    } catch (err: any) {
      console.log(`message: ${err.message}`);
      res.status(400).json({ message: err.message });
    }
  }
);

DataRouter.patch(
  "/:id",

  getDataModel,
  async (req: Request, res: any): Promise<void> => {
    if (req.body.Value1 != null) {
      res.functionDataModel.Value1 = req.body.Value1;
    }
    if (req.body.Value2 != null) {
      res.functionDataModel.Value2 = req.body.Value2;
    }
    try {
      const updatedDataModel: iData = await res.functionDataModel.save();
      console.log("PATCH successfull...");
      res.status(201).json(updatedDataModel);
    } catch (err: any) {
      console.log(`message: ${err.message}`);
      res.status(400).json({ message: err.message });
    }
  }
);

async function getDataModel(
  req: Request,
  res: any,
  next: NextFunction
): Promise<any> {
  let functionDataModel;
  try {
    functionDataModel = await DataModel.findById(req.params.id);
    if (functionDataModel == null) {
      console.log("Request Not Found...");
      return res.status(404).json({ message: "Request Not Found..." });
    }
  } catch (err: any) {
    console.log(`message: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }

  res.functionDataModel = functionDataModel;
  next();
}
