import express, { Request, Response } from 'express';
import UserTableModel from '../models/user_model';
import { User } from '../models/store_types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const usersTable = UserTableModel;
dotenv.config();
const {
    TOKEN_SECRET
} = process.env;

type UserQueryRequest = {
    query : string,
    token : string,
    filters  : {
        id: number,
        username: string,
        firstname: string,
        lastname: string,
        password: string
    };
}



const create = async (req: Request, res: Response) => {
    const {query, filters, token} : UserQueryRequest = req.body;

    try {

        const inputUser: User = {
            username :  filters.username,
            firstname : filters.firstname,
            lastname :  filters.lastname,
            password : filters.password
        }

        const newUser: User | undefined = await usersTable.create(inputUser);
        // @ts-ignore
        const token = jwt.sign({user: newUser}, TOKEN_SECRET);        
        res.json(token);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
}




const show = async (req: Request, res : Response) => {
    const {query, filters, token} : UserQueryRequest = req.body;

    try {
        // @ts-ignore
        jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return
    }


    try {
        const userId : number = filters.id;
        const user : User = await usersTable.show(userId);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}



const index = async (req: Request, res : Response) => {
    const {query, token, filters} : UserQueryRequest = req.body;

    try {
        // @ts-ignore
        jwt.verify(token, TOKEN_SECRET);
    } catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return
    }

    try {
        const users : Array<User> = await usersTable.index();
        res.json(users);

    } catch (err) {
        res.status(400);
        res.json(err);
    }
}


const userRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users', index);
    app.get('/users/:id', show);
}



export default userRoutes;