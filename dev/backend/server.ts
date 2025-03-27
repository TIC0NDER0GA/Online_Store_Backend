import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';

const  corsOprtions = {
    origin:"",
    optionsSuccessStatus: 200
};


const app: express.Express = express();
const port: number = 3000;



app.use(cors(corsOprtions));

app.use(bodyParser.json());

app.listen(port,  () => {
    console.log(`starting app on: ${port}`)
});

