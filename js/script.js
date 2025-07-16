document.getElementById("bntIncrease").addEventListener("click", increase);
document.getElementById("bntDecrease").addEventListener("click", decrease);
document.getElementById("bntStart").addEventListener("click", countDown);
document.getElementById("bntReset").addEventListener("click", resetCountDown);

let fontSize = parseInt(window.getComputedStyle(document.body).fontSize);
let timer = null; // Khai báo biến timer toàn cục

// Hàm này sẽ thiết lập kích thước font chữ cho các nút và input
// Dùng để cập nhật kích thước font chữ của các nút và input khi thay đổi kích thước font chữ
// Nhận vào một tham số là kích thước font chữ (size) và áp dụng
function setButtonFontSize(size) {
  document.getElementById("bntIncrease").style.fontSize = size + "pt";
  document.getElementById("bntDecrease").style.fontSize = size + "pt";
  document.getElementById("bntStart").style.fontSize = size + "pt";
  document.getElementById("bntReset").style.fontSize = size + "pt";
  const inputs = document.getElementsByName("inputTime");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.fontSize = size + "pt";
  }
}
// Hàm tăng kích thước font chữ
function increase() {
  const currentFontSize = (fontSize += 1);
  document.body.style.fontSize = currentFontSize + "pt";
  setButtonFontSize(currentFontSize);
  document.getElementById("fontInfo").innerHTML =
    "Font size hiện tại là " + currentFontSize + "pt";
  localStorage.setItem("fontSize", currentFontSize);
}
// Hàm giảm kích thước font chữ
// Giảm kích thước font chữ của body và cập nhật thông tin hiển thị
function decrease() {
  const currentFontSize = (fontSize -= 1);
  document.body.style.fontSize = currentFontSize + "pt";
  setButtonFontSize(currentFontSize);
  document.getElementById("fontInfo").innerHTML =
    "Font size hiện tại là " + currentFontSize + "pt";
  document.getElementById("clockTime").style.fontSize = `${currentFontSize}pt`;
  localStorage.setItem("fontSize", currentFontSize);
}

// Hàm đếm ngược thời gian
// Hiển thị thời gian còn lại trong phần tử có id "clockTime"
function countDown() {
  let time = document.querySelector("input[name='inputTime']").value;
  if (timer) {
    clearInterval(timer);
  }
  document.getElementById("bntStart").disabled = true;
  timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      document.getElementById("clockTime").innerHTML = "Hết giờ!";
      document.getElementById("bntStart").disabled = false;
    } else {
      if (time <= 5) {
        document.getElementById("clockTime").style.color = "red";
      }
      document.getElementById("clockTime").innerHTML = `Còn lại: ${time} giây`;
      time--;
    }
  }, 1000);
}

function resetCountDown() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  document.getElementById("clockTime").innerHTML = "Thời gian còn lại: 10 giây";
  document.getElementById("clockTime").style.color = "blue";
  document.getElementById("bntStart").disabled = false;
  // Nếu muốn reset input về 10 thì giữ dòng sau, nếu không thì bỏ đi
  document.querySelector("input[name='inputTime']").value = 10;
}

// Khi trang được tải, kiểm tra xem có kích thước font chữ đã lưu trong localStorage không
// Nếu có, áp dụng kích thước đó cho body và các nút, đồng thời
window.onload = function () {
  let savedFontSize = localStorage.getItem("fontSize");

  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    document.body.style.fontSize = `${fontSize}pt`;
    setButtonFontSize(fontSize);
    document.getElementById(
      "fontInfo"
    ).innerHTML = `Font size hiện tại là ${fontSize}pt`;
  } else {
    fontSize = parseInt(window.getComputedStyle(document.body).fontSize);
    setButtonFontSize(fontSize);
    document.getElementById(
      "fontInfo"
    ).innerHTML = `Font size hiện tại là ${fontSize}pt`;
  }
};
