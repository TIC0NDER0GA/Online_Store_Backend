import { User } from "./store_types";
// @ts-ignore
import client from "../backend/database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const {
    BCRPYT,
    SALT_ROUNDS
} = process.env;

const pepper : string | undefined = BCRPYT;
const saltRounds : string| undefined = SALT_ROUNDS;


const UserTableModel = {

    create : async (u: User) : Promise<User>  => {
        try {
             // @ts-ignore
            const conn = await client.connect();
            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt((saltRounds as unknown) as string)
            );
            const sql : string = 'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const result = await conn.query(sql, [ u.firstname ,u.lastname ,u.username ,hash ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Error could not create new user: ${err}`);
        }
    },

    

        // Get a single user by ID
        show: async (id: number) : Promise<User> => {
            try {
                // @ts-ignore
    const conn = await client.connect();
                const sql = "SELECT * FROM users WHERE id = $1";
                const result = await conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            } catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        },

        index : async () : Promise<Array<User>> => {
            try {
                // @ts-ignore
    const conn = await client.connect();
                const sql = "SELECT * FROM users";
                const result = await conn.query(sql);
                conn.release();
                return result.rows;
            } catch (err) {
                throw new Error(`Could not get users. Error: ${err}`);
            }
        }
};

export default UserTableModel;