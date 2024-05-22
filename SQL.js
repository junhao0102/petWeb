//創建資料表的SQL語句
const createTableQuery = `
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Price DECIMAL NOT NULL,
    Picture BYTEA NOT NULL
);
`;

const insertProductQuery = `
INSERT INTO products (ProductName, Price, Picture)
VALUES ($1, $2, $3)
RETURNING id;
`;


module.exports = { createTableQuery, insertProductQuery};
