import * as express from "express";
import * as mongodb from "mongodb";
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

productRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const product = await collections.products.findOne(query);
  
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send(`Failed to find product: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find product: ID ${req?.params?.id}`);
    }
 });

