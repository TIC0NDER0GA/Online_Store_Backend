import { Order } from "../models/store_types";
import OrderTableModel from "../models/order_model";
// @ts-ignore
import client from "../database";





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

    beforeAll(async () => {
        // @ts-ignore
        const conn = await client.connect();
        await conn.query("DELETE FROM orders"); // Clean up the table before running tests
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
                product_id: 2,
                quantity: 3,
            });
    
            expect(addedProduct).toBeDefined();
            expect(addedProduct.order_id).toBe(orderId);
            expect(addedProduct.product_id).toBe(2);
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