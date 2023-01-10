import * as mongodb from "mongodb";

export interface Product {
  productType?: string;
  name?: string;
  image?: string;
  price?: number;
  _id?: mongodb.ObjectId;
}
