const moviePhoto = document.getElementById('movieId')
const movieName = document.getElementById('nameId')
const falseChoice = document.getElementById('falseId')
const countMove = document.getElementById('countId')
const sameTextAlert = document.querySelector('.same')
const loseTextAlert = document.querySelector('.lose')
const winTextAlert = document.querySelector('.win')
const restartBtn = document.querySelector('.restartButton')
let count = 10
let wrongLetters = []
let images = {
  0: 'gladiator.jpg',
  1: 'parasite.jpeg',
  2: 'seven.jpg',
  3: 'terminator.jpg',
  4: 'the godfather.jpeg',
  5: '12 angry men.jpg',
  6: 'goodfellas.jpg',
  7: 'interstellar.jpg',
  8: 'memento.jpg',
  9: 'toy story.jpg',
  10: 'the pianist.jpeg',
}
let randomName = images[Math.floor(Math.random() * Object.keys(images).length)]
let randomNameKey = Object.keys(images).findIndex(
  (key) => images[key] === randomName
)
let randomNameLength = randomName.split('.')[0].replace(/\s/g, '').length
let arrName = randomName.split('.')[0].replace(/\s/g, '')

let displayText = arrName
  .split('')
  .map((char) => (char === ' ' ? ' ' : '_'))
  .join('')
if (randomNameLength === arrName.length) {
  movieName.textContent = displayText
}
moviePhoto.src = `./images/${randomName}`

document.addEventListener('keydown', function (e) {
  if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9]/)) {
    let wrongLetter = false
    for (let i = 0; i < arrName.length; i++) {
      if (arrName[i] === e.key) {
        let newDisplayText =
          displayText.slice(0, i) + e.key + displayText.slice(i + 1)
        movieName.textContent = newDisplayText
        displayText = newDisplayText
        wrongLetter = true
      }
    }
    if (displayText === arrName) {
      delete images[randomNameKey]
      falseChoice.textContent = ''
      wrongLetters = []
      let newImages = {}
      let newIndex = 0

      for (let key in images) {
        newImages[newIndex++] = images[key]
      }
      images = newImages

      if (Object.keys(images).length === 0) {
        winTextAlert.classList.remove('none')
        restartBtn.classList.remove('none')
        restartBtn.addEventListener('click', () => {
          this.location.reload()
        })
        return
      }

      let newRandomName = ''
      let newRandomNameKey = ''

      do {
        newRandomNameKey = Math.floor(
          Math.random() * Object.keys(images).length
        )
        newRandomName = images[newRandomNameKey]
      } while (newRandomName === randomName)

      randomName = newRandomName
      randomNameKey = newRandomNameKey
      moviePhoto.src = `./images/${randomName}`
      randomNameLength = randomName.split('.')[0].replace(/\s/g, '').length
      arrName = randomName.split('.')[0].replace(/\s/g, '')
      displayText = arrName
        .split('')
        .map((char) => (char === ' ' ? ' ' : '_'))
        .join('')
      movieName.textContent = displayText
    }
    if (!wrongLetter) {
      if (wrongLetters.includes(e.key)) {
        sameTextAlert.classList.remove('none')
        setTimeout(() => {
          sameTextAlert.classList.add('none')
        }, 5000)
        return
      }
      wrongLetters.push(e.key)
      falseChoice.textContent =
        'You are entering incorrectly : ' + wrongLetters.join(',')
      if (count > 0) {
        countMove.textContent = `${--count}`
      }
      if (count === 0) {
        loseTextAlert.classList.remove('none')
        setTimeout(() => {
          window.location.reload()
        }, 5000)
      }
    }
  }
})
