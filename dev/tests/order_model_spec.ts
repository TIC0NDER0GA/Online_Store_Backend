import { Order, User } from "../models/store_types";

import OrderTableModel from "../models/order_model";
import UserTableModel from "../models/user_model";
// @ts-ignore
import client from "../backend/database";





describe("Order Model tests", () => {
    const table = OrderTableModel;
    let orderId: number | undefined;
    const testOrder : Order = {
        id : undefined,
        user_id : 1,
        product_id: 1,
        quantity: 5,
        status : "active",
    }

    const user1 : User = {
        id : undefined,
        username : "userDude",
        firstname : "John",
        lastname : "Smith",
        password : "password"
    }

    beforeAll(async () => {
        // @ts-ignore
        const conn = await client.connect();
        await conn.query("DELETE FROM orders"); // Clean up the table before running tests
        await conn.query("INSERT INTO users (firstName, lastName, username, password)  VALUES ('John', 'Doe', 'johndoe123', 'securepassword123')  ");
        await conn.query("INSERT INTO Products (name, price, category) VALUES ('Wireless Mouse', 29.99, 'Electronics') ");
        conn.release();
    });

    it("should create a new order", async () => {
        const createdOrder = await table.create(testOrder);
        expect(createdOrder).toBeDefined();
        expect(createdOrder.user_id).toBe(testOrder.user_id);
        expect(createdOrder.status).toBe(testOrder.status);
        orderId = createdOrder.id;
    });

    it("should return orders based on user ID", async () => {
        const user_id : number = 1;
        const order = await table.show(user_id);
        // @ts-ignore
        expect(order.length).toBeGreaterThan(0);
    });

        /** ✅ TESTING addProducts METHOD */
        it("should add a product to an order", async () => {
            const addedProduct = await table.addProducts({
                order_id: orderId as number,
                user_id: 1,
                product_id: 1,
                quantity: 3,
            });
    
            expect(addedProduct).toBeDefined();
            expect(addedProduct.order_id).toBe(orderId);
            expect(addedProduct.product_id).toBe(1);
            expect(addedProduct.quantity).toBe(3);
        });
    
        /** ✅ TESTING showProductByUser METHOD */
        it("should retrieve products for a user", async () => {
            const user_id = 1;
            const products = await table.showProductByUser(user_id);
    
            expect(products.length).toBeGreaterThan(0);
            expect(products[0].user_id).toBe(user_id);
        });

});