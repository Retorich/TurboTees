import * as mongodb from "mongodb";
import { Product } from "./product";

export const collections: {
   products?: mongodb.Collection<Product>; // parameter any used to get rid of error, should be ProductInfo but that errors out.
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("CapstoneData");
 
   const productsCollection = db.collection<Product>("ProductInfo");
   collections.products = productsCollection;

   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "products",
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("products");
       }
   });
}