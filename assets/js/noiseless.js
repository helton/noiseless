function getRandomColorChannel() {
  return Math.floor(Math.random() * 256)
}

function getRandomColor() {
  const r = getRandomColorChannel()
  const g = getRandomColorChannel()
  const b = getRandomColorChannel()
  return "rgb(" + r + "," + g + "," + b + ")"
}

function changeBackgroundColor() {
  const randomColor = getRandomColor()
  document.querySelector('body').style.backgroundColor = randomColor
}

function setButtonEvents() {
  const buttons = Array.prototype.slice.call(document.querySelectorAll("button"))
  const images = Array.prototype.slice.call(document.querySelectorAll("img"))
  const toggleElement = element => {
    element.addEventListener("click", event => {
      element.classList.toggle("active")
    })
  }
  buttons.forEach(toggleElement);
  images.forEach(toggleElement);
}

function setBackgroundChange() {
  changeBackgroundColor();
  setInterval(changeBackgroundColor, 10000)
}

function run() {
  setButtonEvents()
  setBackgroundChange()
}

run()
