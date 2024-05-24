// 當整個 DOM 結構加載完畢後執行此函數
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
});

async function ProductSubmit(event, category) {
    // 阻止表單的預設提交行為，以便我們可以使用JavaScript來處理數據
    event.preventDefault();

    // 取得表單元素
    const form = event.target;
    const product = form.querySelector('input[name="name"]').value;
    const price = form.querySelector('input[name="price"]').value;
    const imageFile = form.querySelector('input[name="image"]').files[0];
    // 建立 FileReader 對象，用於讀取文件內容
    const reader = new FileReader();
    // 設定onloadend事件處理器，當檔案讀取完成時自動呼叫此函數
    reader.onloadend = async () => {
        const base64Image = reader.result.split(",")[1]; //將檔案內容轉換為base64編碼，並去掉
        const data = {
            Category: category,
            Product: product,
            Price: price,
            Picture: base64Image,
        };
        try {
            const response = await fetch("http://localhost:3000/AddPro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                alert("新增成功");
                form.reset();
            } else {
                const errorMessage = await response.text();
                alert(`新增失敗: ${errorMessage}`);
            }
        } catch (error) {
            alert(`新增失敗: ${error.message}`);
        }
    };
    //開始讀取文件，讀取完成後將觸發onloadend事件
    reader.readAsDataURL(imageFile);
}
