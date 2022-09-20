const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const canvasWidth = canvas.width = innerWidth
const canvasHeight =  canvas.height = innerHeight


context.fillStyle = 'dimgray'
context.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
  image.src = '/img/town.png'
image.onload = () => {
  context.drawImage(image, 0, 0, canvasWidth, canvasHeight)

}