const { Pool } = require('pg');
const express = require('express');
const path = require('path');
const SQL = require('./SQL');

const app = express();
const port = 3000;

// 建立資料庫連接池
const pool = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432,
});

// 創建資料表的異步函數
async function createTable() {
    try {
        await pool.query(SQL.createTableQuery);
        console.log('創建資料表成功');
    } catch (err) {
        console.error('創建資料表失敗', err);
        throw err;
    }
}

// 啟動伺服器的異步函數
async function startServer() {
    // 創建資料表
    await createTable();

    // 啟動 Express 伺服器
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    // 監聽伺服器關閉事件以關閉連接池
    process.on('SIGTERM', () => {
        server.close(() => {
            pool.end(() => {
                console.log('連接池已關閉');
            });
        });
    });
}

// 啟動伺服器並處理錯誤
startServer().catch(err => {
    console.error('無法啟動伺服器', err);
    process.exit(1);
});

// 使用 Express 的 JSON 中間件
app.use(express.json());

// 提供靜態文件
app.use(express.static(path.join(__dirname, 'public')));

// 處理根路由，發送 index.html 文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 處理添加產品的請求
app.post('/addProduct', async (req, res) => {
    const { ProductName, Price, Picture } = req.body;
    try {
        const result = await pool.query(SQL.insertProductQuery, [ProductName, Price, Picture]);
        console.log(result);
        res.status(200).json({ id: result.rows[0].id });
    } catch (err) {
        console.error('無法加入產品', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 處理獲取產品的請求
app.get('/getProduct', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.status(200).json(result.rows);

        // 創建產品名稱、價格和圖片的數組
        const productsArr = [];
        const priceArr = [];
        const pictureArr = [];

        // 將結果中的產品名稱、價格和圖片添加到數組中
        result.rows.forEach(product => {
            productsArr.push(product.ProductName);
            priceArr.push(product.Price);
            pictureArr.push(product.Picture);
        });

        console.log(productsArr);
        console.log(priceArr);
        console.log(pictureArr);
    } catch (err) {
        console.error('無法獲取產品', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});