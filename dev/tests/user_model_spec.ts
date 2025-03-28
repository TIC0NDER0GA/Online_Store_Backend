import UserTableModel from "../models/user_model";
import { User } from "../models/store_types";
// @ts-ignore
import client from "../backend/database";


describe(" User Model tests", () => {
    const table = UserTableModel;
    let userId: number;
    
    const user1 : User = {
        id : undefined,
        username : "userDude",
        firstName : "John",
        lastName : "Smith",
        password : "password"
    }

    beforeAll(async () => {
        // @ts-ignore
        const conn = await client.connect();
        await conn.query("DELETE FROM users1"); // Clean up the table before running tests
        conn.release();
    });

    it("should create a new user", async () => {
        const createdUser = await table.create(user1);
        expect(createdUser).toBeDefined();
        // @ts-ignore
        expect(createdUser.firstName).toBe(user1.firstName);
        // @ts-ignore
        expect(createdUser.lastName).toBe(user1.lastName);
        // @ts-ignore
        userId = createdUser.id;
    });

    it("should return a list of books", async () => {
        const books = await table.index();
        expect(books.length).toBeGreaterThan(0);
    });

    it("should return a single user by ID", async () => {
        const user = await table.show(userId);
        expect(user).toBeDefined();
        expect(user.id).toBe(userId);
    });

    });