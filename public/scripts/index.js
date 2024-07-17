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
function renderProducts(containerId, productList) {
  const container = document.getElementById(containerId);
  productList.forEach((item) => {
    console.log(item.src);
    const productDiv = document.createElement('div');
    productDiv.className = 'item';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.name;

    const name = document.createElement('h2');
    name.className = 'info';
    name.textContent = item.name;

    const price = document.createElement('p');
    price.className = 'info';
    price.textContent = `NT$ ${item.price}`;

    const button = document.createElement('button');
    button.textContent = '加入購物車';

    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(price);
    productDiv.appendChild(button);

    container.appendChild(productDiv);
  });
}





document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/getProducts')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(products => {
          renderProducts('row1', products[0]); 
          renderProducts('row2', products[1]); 
          renderProducts('row3', products[2]); 
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
});