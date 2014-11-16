((win, doc) ->

  'use strict'

  canvas = null
  stage = null
  ctx = null
  circle = null
  circles = []
  radius = 10
  posX = 0

  class Bubble
    constructor: () ->
      @init()

    init: () ->
      circle = new createjs.Shape()
      circle.graphics.beginFill('lightblue').drawCircle(0, 0, Math.random() * radius + 5)
      circle.x = Math.random() * (stage.canvas.width / 2)
      circle.y = Math.random() * (stage.canvas.height + radius)
      circle.alpha = 0.5
      circles.push(circle)
      stage.addChild(circle)


  doc.addEventListener 'DOMContentLoaded', ->
    canvas = doc.getElementById('canvas')
    stage = new createjs.Stage(canvas)

    # bubble = new Bubble()
    for i in [0..10]
      new Bubble()
    stage.update()
    createjs.Ticker.addEventListener('tick', tick)

    return
  , false

  tick = (e) ->
    for circle in circles
      circle.y -= 10
      circle.x = (Math.sin(posX += 0.6) * 8 + 8) + 320 #circle.x
      if circle.y <= -100 then circle.y = stage.canvas.height + radius

    stage.update(e)

  return

) @, @.document
