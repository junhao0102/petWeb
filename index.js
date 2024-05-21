const express = require('express');
const path = require('path');
const app = express();

//將public資料夾設為靜態資源
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
