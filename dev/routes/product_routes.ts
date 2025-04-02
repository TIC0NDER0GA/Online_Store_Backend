import express, { Request, Response } from 'express';
import ProductTableModel from '../models/product_model';
import { Product } from '../models/store_types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const productsTable = ProductTableModel;
dotenv.config();
const {
    TOKEN_SECRET
} = process.env;

type ProductQueryRequest = {
    query : string,
    token : string,
    filters  : {
        id: number,
        name: string,
        price: number,
        category: string,
    };
}



const create = async (req: Request, res: Response) => {
    const {query, filters, token} : ProductQueryRequest = req.body;


    try {
        // @ts-ignore
        jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return
    }

    try {


        const inputProduct: Product = {
            name: filters.name,
            price: filters.price,
            category: filters.category
        }


        const product: Product | undefined = await productsTable.create(inputProduct);

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
}




const show = async (req: Request, res : Response) => {
    const {query, filters} : ProductQueryRequest = req.body;
    
    try {
        const productId : number = filters.id;
        const product : Product = await productsTable.show(productId);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}



const index = async (req: Request, res : Response) => {
    const {query, filters} : ProductQueryRequest = req.body;
    try {
        const products : Array<Product> = await productsTable.index();
        res.json(products);

    } catch (err) {
        res.status(400);
        res.json(err);
    }
}


const productRoutes = (app: express.Application) => {
    app.post('/products', create);
    app.get('/products', index);
    app.get('/products/:id', show);
}



export default productRoutes;