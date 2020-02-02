var c1 = 0
var c2 = 0
var c3 = 0

function readResistance() {
  $.ajax({
    url: "http://localhost:3000/serial_port/read",
    dataType: "script"
  }).done(function(data) {
    // console.log("success", data)
  }).fail(function() {
    // console.log("error")
  }).always(function() {
    // console.log("complete")
  })

  var r1 = getResistanceFromDOM(1)
  var r2 = getResistanceFromDOM(2)
  var r3 = getResistanceFromDOM(3)

  // changeRectangleCSS(r1, r2, r3)

  // $('body').append("<div>" +  + "</div>")

  console.log(r1, r2, r3)

  setTimeout(function () { readResistance() }, 1000)
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getResistanceFromDOM(position) {
  // console.log($('div'))
  // console.log($('div')[position])
  return $("div:nth-child(" + position + ")").html()
}

function generateColorChannel() {
  return getRandomArbitrary(100, 256)
}

function generateColor() {
  const r = generateColorChannel()
  const g = generateColorChannel()
  const b = generateColorChannel()
  let colorArray = [r, g, b]
  const random = Math.floor(Math.random() * colorArray.length)
  colorArray[random] = 0
  const colorCSS = "rgb(" + colorArray.join() + ")"

  return colorCSS
}

function changeRectangleCSS(r1, r2, r3) {
  var r = Math.round(r1 / 1000)
  var g = Math.round(r2 / 1000)
  var b = Math.round(r3 / 1000)

  r = r * 6

  console.log(r)
  // const width  = generateSize()
  // const height = generateSize()
  // const x = generateShift(width) + "%"
  // const y = generateShift(height) + "%"
  // const translate = [x, y].join()
  // const scale = Math.random() * (1.5 - 0.2) + 0.2
  // const rotate = 0 // Math.random() * (360 - 0) + 0
  // const skewX = 0 // Math.random() * (360 - 0) + 0
  // const skewY = 0 // Math.random() * (360 - 0) + 0
  // const blur = getRandomArbitrary(0, 20)

  // $('body').css({
  //   // "top":              generateShift(height) + "%",
  //   // "left":             generateShift(width) + "%",
  //   // "transform":        "translate(" + translate + ") translateZ(0) scale(" + scale + ")" + "rotate(" + rotate + "deg)" + "skewX(" + skewX + "deg)" + "skewY(" + skewY + "deg)",
  //   // "width":            width + "%",
  //   // "height":           height + "%",
  //   // "background-color": generateColor(),
  //   "background-color": "rgba(" + r + "," + r + "," + r +")"
  //   // "filter":           "blur(" + blur + "px)"
  // })
}

$(function() {
  console.log("DOM Ready")

  if ($("#serialPort").length) {
    console.log("True")
    readResistance()
  }
})
