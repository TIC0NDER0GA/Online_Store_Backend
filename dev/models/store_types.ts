//  Product
// id
// name
// price
// [OPTIONAL] category

type Product = {
    id? : number,
    name : string,
    price : number,
    category? : string
}

// User
// id
// firstName
// lastName
// password

type User = {
    id? : number,
    username : string,
    firstName : string,
    lastName : string,
    password : string
}

// Orders
// id
// id of each product in the order
// quantity of each product in the order
// user_id
// status of order (active or complete)

type Order = {
    id : number,
    products : Array<number>,
    productQty : Array<number>,
    user_id : number,
    status? : string,
}

export type {Product, User, Order};