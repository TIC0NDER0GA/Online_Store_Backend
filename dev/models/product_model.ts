import { Product } from "./store_types";
// @ts-ignore
import client from "../backend/database";


 const ProductTableModel = {
    // Create a new product
    create : async (product: Product) : Promise<Product> => {
        try {
            // @ts-ignore
const conn = await client.connect();
            const sql = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not add new product. Error: ${err}`);
        }
    },

    // Get all products
    index : async () : Promise<Product[]> => {
        try {
            // @ts-ignore
const conn = await client.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    },

    // Get a single product by ID
     show: async (id: number) : Promise<Product> => {
        try {
            // @ts-ignore
const conn = await client.connect();
            const sql = "SELECT * FROM products WHERE id = $1";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    },

 }

export default ProductTableModel;