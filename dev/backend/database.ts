import dotenv from 'dotenv';
import {Pool} from 'pg';


dotenv.config();


const {
    POST_DATABASE, 
    POST_HOST,
    POST_USER,
    POST_PASSWORD,
    ENV,
    POST_DATABASE_TEST
} = process.env;

let env : string = (ENV as unknown) as string;



let client;

switch (env.trim()) {
    case "build":
        client = new Pool({
            host: POST_HOST,
            database: POST_DATABASE,
            user: POST_USER,
            password: POST_PASSWORD
        
        });
        break;
    case"test":
    
    client = new Pool({
        host: POST_HOST,
        database: POST_DATABASE_TEST,
        user: POST_USER,
        password: POST_PASSWORD
    });
        break;
    

}



export default client;