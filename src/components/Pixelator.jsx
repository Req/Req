import { useRef, useEffect } from "react"

function Pixelator() {
  const canvasElement = useRef()

  useEffect(() => {
    // Are you KIDDING me with this type casting?

    const canvas = /** @type {HTMLCanvasElement} */ canvasElement.current
    const btn = document.querySelector("#btn")
    const in_file = document.querySelector("#image-file")
    const in_nbr = document.querySelector("#image-multiplier")

    let pixelMultiplier = parseInt(in_nbr.value)

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = /** @type {CanvasRenderingContext2d} */ canvas.getContext("2d")

    const img = document.querySelector("img")

    img.addEventListener("load", () => {
      let imageHeight = img.height
      let imageWidth = img.width

      // draw centered image
      const posX = Math.ceil(canvas.width / 2 - imageWidth / 2)
      const posY = Math.ceil(canvas.height / 2 - imageHeight / 2)
      ctx.drawImage(img, posX, posY, imageWidth, imageHeight)

      // read rendered image pixels
      const imageData = ctx.getImageData(posX, posY, imageWidth, imageHeight)
      const pixelvalues = imageData.data
      // console.log(pixelvalues)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // lööp over image, each 5th pixel
      let loopkiller = 100000 // around 100k

      for (let row = 1; row < imageHeight; row = row + pixelMultiplier) {
        for (let col = 1; col < imageWidth; col = col + pixelMultiplier) {
          loopkiller--
          if (loopkiller < 0) {
            return console.log("killed")
          }

          // get 1st pixel color
          const pixelReference = (row * imageWidth + col) * 4

          if (pixelReference === null || typeof pixelReference === "undefined") {
            return console.log("Invalid pixel reference")
          }

          const color = `rgb(
              ${pixelvalues[pixelReference]},
              ${pixelvalues[pixelReference + 1]},
              ${pixelvalues[pixelReference + 2]}
          )`

          // +3 would be the alpha channel, which is pointless for us
          // console.log(pixelReference, color);
          // draw "pixel" ball
          ctx.fillStyle = color
          ctx.fillRect(posX + col, posY + row, pixelMultiplier, pixelMultiplier)
        }
      }
    })































    // THIS
    btn.addEventListener("click", e => {
      pixelMultiplier = parseInt(in_nbr.value)
      if (pixelMultiplier > 666) {
        return alert("thats too much")
      } else if (pixelMultiplier < 2) {
        return alert("2 or more pls")
      }

      const file = in_file.files[0]
      if (file.size > 900000) {
        return alert("Use a smaller image pls")
      }
      const fr = new FileReader()
      fr.onload = () => {
        img.src = fr.result
      } // onload fires after reading is complete
      fr.readAsDataURL(file) // begin reading
    })
  })

  return (
    <div>
      <canvas ref={canvasElement}></canvas>
      <img src="veera.png" style={{ display: "none" }} />
    </div>
  )
}

export default Pixelator
