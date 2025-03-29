/* Replace with your SQL commands */
-- Product
-- id
-- name
-- price
-- [OPTIONAL] category

CREATE TABLE Products ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price FLOAT,
    category VARCHAR(150) default NULL
);

-- User
-- id
-- firstName
-- lastName
-- password

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    username VARCHAR(255),
    password VARCHAR(255),
);


-- Orders
-- id
-- id of each product in the order
-- quantity of each product in the order
-- user_id
-- status of order (active or complete)

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