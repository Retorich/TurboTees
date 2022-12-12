import * as mongodb from "mongodb";

export interface Product {
    id?: string;
    productType?: string;
    name?: string;
    image?: string;
    price?: number;
 }