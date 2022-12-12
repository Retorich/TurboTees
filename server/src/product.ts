import * as mongodb from "mongodb";
 
export interface Product {
   _id?: mongodb.ObjectId;
   id?: string;
   productType?: string;
   name?: string;
   image?: string;
   price?: number;

}