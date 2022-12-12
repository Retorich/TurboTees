import * as express from "express";
import { collections } from "./database";
 
export const productRouter = express.Router();
productRouter.use(express.json());
 
productRouter.get("/", async (_req, res) => {
   try {
       const products = await collections.products.find({}).toArray();
       res.status(200).send(products);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

