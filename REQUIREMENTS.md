Products
    Index
    Show
    Create [token required]
    [OPTIONAL] Top 5 most popular products
    [OPTIONAL] Products by category (args: product category)

Users
    Index [token required]
    Show [token required]
    Create N[token required]
    Orders
    Current Order by user (args: user id)[token required]
    [OPTIONAL] Completed Orders by user (args: user id)[token required]

Data Shapes
    Product
    id
    name
    price
    [OPTIONAL] category

User
    id
    firstName
    lastName
    password

Orders
    id
    id of each product in the order
    quantity of each product in the order
    user_id
    status of order (active or complete)



CREATE TABLE Products ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price FLOAT,
    category VARCHAR(150) default NULL
);


CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    username VARCHAR(255),
    password VARCHAR(255)
);



CREATE TABLE Orders (
     id SERIAL PRIMARY KEY,
     user_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
     status VARCHAR(50)
 );

 CREATE TABLE Order_Products (
     id SERIAL PRIMARY KEY,
     order_id INT NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
     user_id INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
     product_id INT NOT NULL REFERENCES Products(id) ON DELETE CASCADE,
     quantity INT NOT NULL CHECK (quantity > 0)
 );


.env file contents:
POST_DATABASE=storedatabase
POST_DATABASE_TEST=storedatabase_test
POST_HOST=127.0.0.1
POST_USER= postgres
POST_PASSWORD=postgres
ENV=build
BCRPYT=In-Comunity-there-is-belonging-and-warmth
SALT_RROUNDS=13
TOKEN_SECRET=vibesareimmaculate31771!

RESTFUL END POINTS:
Users
POST /users - Create a new user
GET /users - Get all users
GET /users/:id - Get a specific user by ID

Products
POST /products - Create a new product
GET /products - Get all products
GET /products/:id - Get a specific product by ID

Orders
GET /orders/user/:id - Get all orders for a specific user ID
