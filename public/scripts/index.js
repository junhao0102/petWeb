// 輪播
let slides = document.querySelectorAll('.slide');
currentIndex = 0;

// 選擇當前圖片顯示
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
  });
}
// 上一張按鈕
document.getElementById('prev').addEventListener('click', () => {
  currentIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
  showSlide(currentIndex);
});
// 下一張按鈕
document.getElementById('next').addEventListener('click', () => {
  currentIndex =
    currentIndex >= slides.length - 1 ? slides.length - 1 : currentIndex + 1;
  showSlide(currentIndex);
});

showSlide(currentIndex);

//商品
const products = [
  [
    { name: '貓砂', price: 266, src: './images/shop1.png' },
    { name: '牛肉塊零食', price: 266, src: './images/shop2.png' },
    { name: '雞肉丁零食', price: 285, src: './images/shop3.png' },
    { name: '葉黃素', price: 300, src: './images/shop4.png' },
  ],
  [
    { name: '鮮蝦丁', price: 256, src: './images/shop5.png' },
    { name: '雞肉丁零食', price: 285, src: './images/shop6.png' },
    { name: '專利蔓越莓', price: 249, src: './images/shop7.png' },
    { name: '腎臟保健粉', price: 299, src: './images/shop8.png' },
    { name: '腎臟保健粉', price: 299, src: './images/shop8.png' },
  ],
  [
    { name: '葉黃素', price: 300, src: './images/shop4.png' },
    { name: '深海魚油', price: 799, src: './images/shop9.png' },
    { name: '保健粉', price: 249, src: './images/shop10.png' },
    { name: '益生菌', price: 299, src: './images/shop11.png' },
  ],
];
//TOP熱銷商品
document.addEventListener('DOMContentLoaded', function () {
  // 取得所有容器
  const container = document.getElementById('row1');
  const product = products[0];
  product.forEach((item) => {
    // 建立產品 div
    const productDiv = document.createElement('div');
    productDiv.className = 'item';
    // 取得圖片
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;
    // 取得產品名稱
    const name = document.createElement('h2');
    name.className = 'info';
    name.textContent = item.name;
    // 取得價格
    const price = document.createElement('p');
    price.className = 'info';
    price.textContent = `NT$ ${item.price}`;
    // 建立按鈕
    const button = document.createElement('button');
    button.textContent = '加入購物車';
    productDiv.appendChild(img); // 將圖片加入到產品 div
    productDiv.appendChild(name); // 將產品名稱加入到產品 div
    productDiv.appendChild(price); // 將價格加入到產品 div
    productDiv.appendChild(button); // 將按鈕加入到產品 div
    container.appendChild(productDiv); // 將整個產品 div 加入到容器中
  });
});

// 貓咪專區
document.addEventListener('DOMContentLoaded', function () {
  // 取得所有容器
  const container = document.getElementById('row2');
  const product = products[1];
  product.forEach((item) => {
    // 建立產品 div
    const productDiv = document.createElement('div');
    productDiv.className = 'item';
    // 取得圖片
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;
    // 取得產品名稱
    const name = document.createElement('h2');
    name.className = 'info';
    name.textContent = item.name;
    // 取得價格
    const price = document.createElement('p');
    price.className = 'info';
    price.textContent = `NT$ ${item.price}`;
    // 建立按鈕
    const button = document.createElement('button');
    button.textContent = '加入購物車';
    productDiv.appendChild(img); // 將圖片加入到產品 div
    productDiv.appendChild(name); // 將產品名稱加入到產品 div
    productDiv.appendChild(price); // 將價格加入到產品 div
    productDiv.appendChild(button); // 將按鈕加入到產品 div
    container.appendChild(productDiv); // 將整個產品 div 加入到容器中
  });
});

// 狗狗專區
document.addEventListener('DOMContentLoaded', function () {
  // 取得所有容器
  const container = document.getElementById('row3');
  const product = products[2];
  product.forEach((item) => {
    // 建立產品 div
    const productDiv = document.createElement('div');
    productDiv.className = 'item';
    // 取得圖片
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;
    // 取得產品名稱
    const name = document.createElement('h2');
    name.className = 'info';
    name.textContent = item.name;
    // 取得價格
    const price = document.createElement('p');
    price.className = 'info';
    price.textContent = `NT$ ${item.price}`;
    // 建立按鈕
    const button = document.createElement('button');
    button.textContent = '加入購物車';
    productDiv.appendChild(img); // 將圖片加入到產品 div
    productDiv.appendChild(name); // 將產品名稱加入到產品 div
    productDiv.appendChild(price); // 將價格加入到產品 div
    productDiv.appendChild(button); // 將按鈕加入到產品 div
    container.appendChild(productDiv); // 將整個產品 div 加入到容器中
  });
});
