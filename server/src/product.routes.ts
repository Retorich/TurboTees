import * as express from "express";
import { collections } from "./database";

export const productRouter = express.Router();
productRouter.use(express.json());

productRouter.get("/", async (_req, res) => {
  try {
    const products = await collections.products?.find({}).toArray();
    res.status(200).send(products);
  } catch (error) {
    let errorMessage = "Oops thats not working";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
  }
});
