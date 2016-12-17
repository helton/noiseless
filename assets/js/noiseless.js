function getRandomColorChannel() {
  return Math.floor(Math.random() * 256)
}

function getRandomColor() {
  const red = getRandomColorChannel()
  const green = getRandomColorChannel()
  const blue = getRandomColorChannel()
  return `rgb(${red},${green},${blue})`
}

function changeBackgroundColor() {
  const randomColor = getRandomColor()
  document.querySelector('body').style.backgroundColor = randomColor
}

function setButtonEvents() {
  const buttons = document.querySelectorAll("button")
  const images = document.querySelectorAll("img")
  const sliders = document.querySelectorAll(`input[type="range"]`)

  buttons.forEach(button => {
    button.addEventListener("click", event => {
      button.classList.toggle("active")
    })
  })

  images.forEach(image => {
    image.addEventListener("click", event => {
      const key = image.parentElement.attributes["data-key"].value

      image.classList.toggle("active")
      const slider = document.querySelector(`div[data-key="${key}"] > input[type="range"]`)
      slider.classList.toggle("slider-active")

      const audio = document.querySelector(`audio[data-key="${key}"]`)
      if (audio)
        audio.paused ? audio.play() : audio.pause()
    })
  })

  sliders.forEach(slider => {
    slider.addEventListener("input", event => {
      const key = slider.parentElement.attributes["data-key"].value

      const audio = document.querySelector(`audio[data-key="${key}"]`)
      if (audio)
        audio.volume = slider.value / (slider.max - slider.min)
    })
  })
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
