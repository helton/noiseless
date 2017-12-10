const FADE_IN = 'fade-in'
const FADE_OUT = 'fade-out'
const NONE = 'none'
const FADE_INTERVAL = 3000
const FADE_ITERATIONS = 100
//make sure to keep this value in sync with img.opacity initial value (noiseless.css)
const MIN_OPACITY = 0.2
const status = {}

setInterval(() => console.log(`status = ${JSON.stringify(status)}`), 100)

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

function fadeIn(audio, slider, image, value) {
  const key = audio.dataset.key  
  audio.play()
  audio.volume = 0
  status[key] = FADE_IN
  const intervalHandler = setInterval(() => {
    if (status[key] !== FADE_IN) {
      clearInterval(intervalHandler)
    }
    else {
      audio.volume = Math.min(audio.volume + value / FADE_ITERATIONS, value)
      slider.value = audio.volume * (slider.max - slider.min)
      const opacity = Math.max(audio.volume / value, MIN_OPACITY)
      image.style.opacity = opacity
      slider.style.opacity = opacity
      //we should apply the class only after the initial opacity is set
      if (!slider.classList.contains("slider-active")) {
        slider.classList.add("slider-active")  
      }
      if (audio.volume === value) {
        clearInterval(intervalHandler)
        status[key] = NONE
      }
    }
  }, FADE_INTERVAL / FADE_ITERATIONS)
}

function fadeOut(audio, slider, image, value) {
  const key = audio.dataset.key
  status[key] = FADE_OUT
  const originalVolume = slider.value
  const intervalHandler = setInterval(() => {
    if (status[key] !== FADE_OUT) {
      clearInterval(intervalHandler)
    }
    else {
      audio.volume = Math.max(audio.volume - value / FADE_ITERATIONS, 0)
      slider.value = audio.volume * (slider.max - slider.min)
      const opacity = Math.max(audio.volume / value, MIN_OPACITY)
      image.style.opacity = opacity
      slider.style.opacity = opacity
      if (audio.volume === 0) {
        clearInterval(intervalHandler)
        audio.pause()
        slider.classList.remove("slider-active")
        status[key] = NONE
        slider.value = originalVolume
      }
    }
  }, FADE_INTERVAL / FADE_ITERATIONS)
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
      const slider = document.querySelector(`div[data-key="${key}"] > input[type="range"]`)

      const audio = document.querySelector(`audio[data-key="${key}"]`)
      if (audio) {
        const volume = slider.value / (slider.max - slider.min)
        switch (status[key]) {
          case FADE_IN:
            fadeOut(audio, slider, image, volume)
            break
          case FADE_OUT:
            fadeIn(audio, slider, image, volume)
            break
          default:
            audio.paused ? fadeIn(audio, slider, image, volume) : fadeOut(audio, slider, image, volume)
        }
        
      }
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
