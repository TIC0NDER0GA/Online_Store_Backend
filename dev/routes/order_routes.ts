import express, { Request, Response } from 'express';
import OrderTableModel from '../models/order_model';
import { Order } from '../models/store_types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const ordersTable = OrderTableModel;
dotenv.config();
const {
    TOKEN_SECRET
} = process.env;

type OrderQueryRequest = {
    query : string,
    token : string,
    filters  : {
        id: number,
        name: string,
        price: number,
        category: string,
        quantity: number,
        user_id: number,
        product_id: number,
        order_id: number
    };
}



const create = async (req: Request, res: Response) => {
    const {query, filters, token} : OrderQueryRequest = req.body;


    try {
        // @ts-ignore
        jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return
    }

    try {

        const inputOrder: Order = {
            user_id: filters.user_id,
            status: "Active",
        }


        const order: Order | undefined = await ordersTable.create(inputOrder);

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
}




const show = async (req: Request, res : Response) => {
    const {query, filters} : OrderQueryRequest = req.body;
    
    try {
        const userId : number = filters.user_id;
         // @ts-ignore
        const order : Order = await ordersTable.showProductByUser(userId);
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}




const addProducts = async (req: Request, res: Response) => {
    const {query, filters} : OrderQueryRequest = req.body;

    try {

        const inputOrder: Order = {
            user_id: filters.user_id,
            status: "Active",
            quantity : filters.quantity,
            order_id: filters.order_id,
            product_id: filters.product_id
        }

         // @ts-ignore
        const order : Array<Order> = await ordersTable.addProducts(inputOrder);
        res.json(order);

    } catch (err) {
        res.status(400);
        res.json(err);
    }
}




const orderRoutes = (app: express.Application) => {
    app.post('/orders', create);
    app.get('/orders/:id', show);
    app.post('/orders/:id/products', addProducts);
}



export default orderRoutes;