const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const SQL = require('./SQL');

const app = express();
const port = 3000;

// 設置 PostgreSQL 資料庫連接池
const pool = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5555,
});

// 創建資料表的異步函數
async function createTable() {
    try {
        await pool.query(SQL.createTableQuery);
        console.log('資料表初始化成功');
    } catch (err) {
        console.error('創建資料表失敗', err);
        throw err;
    }
}

// 啟動伺服器的異步函數
async function startServer() {
    await createTable();

    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    // 監聽伺服器關閉事件以關閉資料庫連接池
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

// 設置靜態資源目錄
app.use(express.static(path.join(__dirname, 'public')));

// http://localhost:3000/uploads 會映射到uploads 目錄。
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 設定限制 body-parser 的請求主體大小
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// 處理添加產品的請求
app.post('/AddPro', async (req, res) => {
    const { Category, Product, Price, Picture } = req.body;
    const PicturePath = `uploads/${Date.now()}.png`; // 設置圖片保存路徑

    try {
        // 確保上傳目錄存在，如果不存在則創建它
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        // 將 base64 編碼的圖片數據寫入文件
        fs.writeFileSync(PicturePath, Buffer.from(Picture, 'base64'));
        await pool.query(SQL.insertProductQuery, [Category, Product, Price,PicturePath]);
        res.status(200).send('Success');
    } catch (err) {
        console.log(err)
        res.status(500).send('Internal server error');
    }
});

// 處理獲取產品的請求
app.get('/getProducts', async (req, res) => {
    try {
        const result = await pool.query(SQL.getProductQuery);
        let products = []
        let famousArr = []
        let catArr =[]
        let dogArr =[]

        for (let i = 0; i < result.rows.length; i++) {
            let product = result.rows[i];
        
            if (product.category === 'famous') {
                let famousObj = {}
                famousObj.name = product.product;
                famousObj.price = product.price;
                famousObj.src = product.picturepath;
                famousArr.push(famousObj);
            } else if (product.category === 'cat') {
                let catObj = {}
                catObj.name = product.product;
                catObj.price = product.price;
                catObj.src = product.picturepath
                catArr.push(catObj);
            } else if (product.category === 'dog') {
                let dogObj = {}
                dogObj.name = product.product;
                dogObj.price = product.price;
                dogObj.src = product.picturepath
                dogArr.push(dogObj);
            }
        }
        products.push(famousArr, catArr, dogArr)
        res.status(200).json(products);



    } catch (error) {
        res.status(500).send('Internal server error');
    }

})
