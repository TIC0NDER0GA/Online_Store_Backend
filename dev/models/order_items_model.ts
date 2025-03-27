import { Order_Items } from "./store_types";
// @ts-ignore
import client from "../backend/database";


const OrderItemsTableModel = {
    create : async (order_it: Order_Items) : Promise<Order_Items> => {
        try {
            // @ts-ignore
const conn = await client.connect();
            const sql = "INSERT INTO orders (user_id, order_id, product_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *";
            const result = await conn.query(sql, [order_it.user_id, order_it.order_id, order_it.product_id, order_it.quantity]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new order_item. Error: ${err}`);
        }
    },
    show : async (userid : number) : Promise<Array<Order_Items> | null>  => {
        try {
        // @ts-ignore
        const conn = await client.connect();
            const sql = "SELECT * FROM order_items WHERE user_id = $1";
            const result = await conn.query(sql, [userid]);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log(`Error: ${err}`);
        }
        return null;
    }
};

export default {OrderItemsTableModel};