import React, { useState } from "react";
import Strange from "./imgs/Strange.jpg";

import "./App.css";

function App() {
  const [src, setSrc] = useState(Strange); // 儲存base64字串

  // 將圖片轉化為base64字串
  const UploadImgBase = (e) => {
    const files = e.target.files[0];

    // 只接受png & jpg
    if (files.type === "image/png" || files.type === "image/jpeg") {
      // 需要小於1mb(131072，所以抓大概)
      if (files.size < 130000) {
        const reader = new FileReader();

        reader.readAsBinaryString(files);
        reader.onload = function () {
          const data =
            "data:" + files.type + ";base64," + window.btoa(this.result);

          setSrc(data);
        };
      }
    }
  };

  // input:file隱藏 利用label的for做按鈕輸出
  return (
    <div className="UploadImg">
      <label htmlFor="formFile">
        <input type="text" />
        <input
          type="file"
          id="formFile"
          onChange={UploadImgBase}
          className="fileInput"
        />
        <p className="fakeBtn">上傳圖片</p>
      </label>
      <div className="viewImg">
        <img src={src} alt="預覽圖片" />
      </div>
    </div>
  );
}

export default App;
