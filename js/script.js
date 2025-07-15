document.getElementById("bntIncrease").addEventListener("click", increase);
document.getElementById("bntDecrease").addEventListener("click", decrease);

let fontSize = parseInt(window.getComputedStyle(document.body).fontSize);

function increase() {
  const currentFontSize = (fontSize += 1);
  document.body.style.fontSize = currentFontSize + "pt";
  document.getElementById("fontInfo").innerHTML =
    "Font size hiện tại là " + currentFontSize + "pt";
  localStorage.setItem("fontSize", currentFontSize);
}

function decrease() {
  const currentFontSize = (fontSize -= 1);
  document.body.style.fontSize = currentFontSize + "pt";
  document.getElementById("fontInfo").innerHTML =
    "Font size hiện tại là " + currentFontSize + "pt";
  localStorage.setItem("fontSize", currentFontSize);
}

window.onload = function () {
  let savedFontSize = localStorage.getItem("fontSize");

  if (savedFontSize) {
    fontSize = parseInt(savedFontSize);
    document.body.style.fontSize = `${savedFontSize}pt`;
    document.getElementById(
      "fontInfo"
    ).innerHTML = `Font size hiện tại là ${savedFontSize}pt`;
  } else {
    fontSize = parseInt(window.getComputedStyle(document.body).fontSize);
    document.getElementById(
      "fontInfo"
    ).innerHTML = `Font size hiện tại là ${fontSize}pt`;
  }
};
