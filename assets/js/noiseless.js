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
  const buttons = document.querySelectorAll("#buttons > button")
  const images = document.querySelectorAll("img")
  const sliders = document.querySelectorAll(`input[type="range"]`)
  const buttonMute = document.querySelector("#btn-mute")

  buttons.forEach(button => {
    button.addEventListener("click", event => {
      button.classList.toggle("active")
    })
  })

  images.forEach(image => {
    image.addEventListener("click", event => {
      const key = image.parentElement.dataset.key

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

  buttonMute.addEventListener("click", event => {
    buttonMute.classList.toggle("fa-volume-up")
    buttonMute.classList.toggle("fa-volume-off")

    const audios = document.querySelectorAll("audio")
    audios.forEach(audio => {
      audio.muted = !audio.muted
    })
  })
}

function setBackgroundChange() {
  changeBackgroundColor()
  setInterval(changeBackgroundColor, 10000)
}

function run() {
  setButtonEvents()
  setBackgroundChange()
}

run()
