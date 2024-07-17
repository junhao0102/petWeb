const createTableQuery = `
CREATE TABLE IF NOT EXISTS AllProducts(
    id SERIAL PRIMARY KEY,
    Category  VARCHAR(255),
    Product VARCHAR(255),
    Price INT,
    PicturePath TEXT
);`;


const insertProductQuery = `
INSERT INTO AllProducts (Category, Product, Price, PicturePath)
VALUES ($1, $2, $3, $4)
`;

const getProductQuery = `SELECT * FROM AllProducts;`;


module.exports = { createTableQuery, insertProductQuery, getProductQuery};
