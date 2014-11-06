((win, doc) ->

  'use strict'

  canvas = null
  stage = null
  ctx = null
  circle = null
  radius = 30
  posX = 0

  class Bubble
    constructor: () ->
      @init()

    init: () ->
      console.log 'init'


  doc.addEventListener 'DOMContentLoaded', ->
    bubble = new Bubble()
    console.log Bubble
    canvas = doc.getElementById('canvas')
    stage = new createjs.Stage(canvas)
    circle = new createjs.Shape()
    circle.graphics.beginFill('lightblue').drawCircle(0, 0, radius)
    circle.x = stage.canvas.width / 2
    circle.y = stage.canvas.height + radius
    circle.alpha = 0.5
    stage.addChild(circle)
    stage.update()
    createjs.Ticker.addEventListener('tick', tick)
    return
  , false

  tick = (e) ->
    circle.y -= 10
    circle.x = (Math.sin(posX += 0.6) * 8 + 8) + 320
    if circle.y <= -100 then circle.y = stage.canvas.height + radius
    stage.update(e)

  return

) @, @.document
