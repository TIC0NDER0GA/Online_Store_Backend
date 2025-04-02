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
        firstname : "John",
        lastname : "Smith",
        password : "password"
    }

    beforeAll(async () => {
        // @ts-ignore
        const conn = await client.connect();
        await conn.query("DELETE FROM users"); // Clean up the table before running tests
        conn.release();
    });

    it("should create a new user", async () => {
        const createdUser = await table.create(user1);
        expect(createdUser).toBeDefined();
        // @ts-ignore
        expect(createdUser.firstname).toBe(user1.firstname);
        // @ts-ignore
        expect(createdUser.lastname).toBe(user1.lastname);
        // @ts-ignore
        userId = createdUser.id;
    });

    it("should return a list of users", async () => {
        const users = await table.index();
        expect(users.length).toBeGreaterThan(0);
    });

    it("should return a single user by ID", async () => {
        const user = await table.show(userId);
        expect(user).toBeDefined();
        expect(user.id).toBe(userId);
    });

    });