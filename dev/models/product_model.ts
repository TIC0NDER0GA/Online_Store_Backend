import { Product } from "./store_types";
// @ts-ignore
import client from "../backend/database";


 const ProductTableModel : {} = {
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

    // Update a product by ID
    update : async (id: number, product: Product): Promise<Product> => {
        try {
            // @ts-ignore
const conn = await client.connect();
            const sql = "UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $6 RETURNING *";
            const result = await conn.query(sql, [product.name, product.price, product.category, id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update product ${id}. Error: ${err}`);
        }
    },

    // Delete a product by ID
    delete : async (id: number): Promise<Product> => {
        try {
            // @ts-ignore
const conn = await client.connect();
            const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}