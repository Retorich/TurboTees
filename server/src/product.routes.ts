import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const productRouter = express.Router();
productRouter.use(express.json());

productRouter.get("/", async (_req, res) => {
  try {
    const products = await collections.products?.find({}).toArray();
    res.status(200).send(products);
  } catch (err) {
    console.log((err as Error).message);
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const product = await collections.products?.findOne(query);

    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send(`Failed to find a product: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a product: ID ${req?.params?.id}`);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product = req.body;
    const result = await collections.products?.insertOne(product); // ? at end of products

    if (result?.acknowledged) {
      // ? at end of result
      res.status(201).send(`Created a new product: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new product.");
    }
  } catch (err) {
    console.error(err);
    console.log((err as Error).message);
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const product = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.products?.updateOne(query, {
      $set: product,
    }); // ? at end of products

    if (result && result?.matchedCount) {
      res.status(200).send(`Updated a product: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find a product: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update a product: ID ${id}`);
    }
  } catch (err) {
    console.error(err);
    console.log((err as Error).message);
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.products?.deleteOne(query); // ? at end of products

    if (result && result.deletedCount) {
      res.status(202).send(`Removed a product: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a product: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find a product: ID ${id}`);
    }
  } catch (err) {
    console.error(err);
    res.status(400).send((err as Error).message);
  }
});
