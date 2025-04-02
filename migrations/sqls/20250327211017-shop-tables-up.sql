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
    password VARCHAR(255)
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

-- My kirby themed test data
INSERT INTO Users (firstName, lastName, username, password) VALUES 
('Pink', 'Amethyst', 'kirby_pink', '$2b$10$NrX4X0j.Pn9KFNYyBRMhU.lVwF.xQnhwpv0XwEFcg4bXMDJE2n3om'),
('Blue', 'Vermilion', 'kirby_blue', '$2b$10$8aLCQb5Ym.8RWoEJxkKw8.RH4qnPLt2K0iWVwSQiW0Cj.lKQxu97O'),
('Green', 'Amber', 'kirby_green', '$2b$10$Z52vECWlCM5DYX5dCdcTjOFiYZ6oXDYTQVmIz0MJsaYKYPACvTXhq'),
('Yellow', 'Indigo', 'kirby_yellow', '$2b$10$OUWRfzTMV5uy5pz3rBKQJenE9CIXpbMsxq/2qUOBBUvZRHKqbsZmy'),
('Red', 'Teal', 'kirby_red', '$2b$10$aZLJbDPwwNTUXgdE5v2jz.5iyDFB1Dxm4OdYrRjaBr/5hM9CwOjqO');


INSERT INTO Products (name, price, category) VALUES
('Maxim Tomato', 9.99, 'Food'),
('Invincibility Candy', 4.99, 'Power-Up'),
('Energy Drink', 3.99, 'Food'),
('Pep Brew', 6.99, 'Food'),
('Star Rod', 29.99, 'Power-Up'),
('Hypernova Fruit', 19.99, 'Power-Up'),
('Warp Star', 49.99, 'Power-Up');


INSERT INTO Orders (user_id, status) VALUES 
(1, 'active'),   -- Pink Kirby's Order
(2, 'complete'), -- Blue Kirby's Order
(3, 'active');   -- Green Kirby's Order


INSERT INTO Order_Products (order_id, user_id, product_id, quantity) VALUES
(1, 1, 1, 1),  -- Pink Kirby -> Maxim Tomato
(1, 1, 2, 1),  -- Pink Kirby -> Invincibility Candy
(1, 1, 4, 1),  -- Pink Kirby -> Pep Brew

(2, 2, 3, 2),  -- Blue Kirby -> Energy Drink x2
(2, 2, 5, 1),  -- Blue Kirby -> Star Rod

(3, 3, 6, 1),  -- Green Kirby -> Hypernova Fruit
(3, 3, 7, 1);  -- Green Kirby -> Warp Star