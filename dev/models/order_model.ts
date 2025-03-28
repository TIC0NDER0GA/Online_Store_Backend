import { Order } from "./store_types";
// @ts-ignore
import client from "../backend/database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";



const OrderTableModel = {


      // Create a new order
      create : async (order : Order) : Promise<Order> => {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = "INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *";
            const result = await conn.query(sql, [order.user_id, order.product_id, order.quantity, order.status]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    },

    show : async (user_id : number) : Promise<Array<Order> | null> => {
        try {
        // @ts-ignore
        const conn = await client.connect();
        const sql = "SELECT * FROM orders WHERE user_id = $1 AND status = 'active' ";
        const result = await conn.query(sql, [user_id]);
        conn.release();
        return result.rows;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
};



export default OrderTableModel;