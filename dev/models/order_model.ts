import { Order } from "./store_types";
// @ts-ignore
import client from "../backend/database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import OrderItemTableModel from "./order_items_model";
const orderItemTB : {} = OrderItemTableModel;


const OrderTableModel = {


      // Create a new order
      create : async (order: Order) : Promise<Order> => {
        try {
            // @ts-ignore
const conn = await client.connect();
            const sql = "INSERT INTO orders (name, price, category) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [order.user_id, order.status]);
            await orderItemTB;
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    },

};

export default {OrderTableModel};