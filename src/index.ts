import { ParticleAnimation } from './animations'
import RenderLoop from './RenderLoop'
import connectGui from './connectGui'
import {
    canvasShape,
} 
from './Interfaces'

const canvasSize: canvasShape = {
    width: 400,
    height: 400
}

const canvasChartSize: canvasShape = {
    width: document.getElementById('main-container').getBoundingClientRect().width,
    height: 150
}

const canvas = <HTMLCanvasElement> document.getElementById("corona-animation")
const ctx: CanvasRenderingContext2D = canvas.getContext("2d")

const canvasChart = <HTMLCanvasElement> document.getElementById("summary-chart")
canvasChart.setAttribute('width', String(canvasChartSize.width))

const ctx2: CanvasRenderingContext2D = canvasChart.getContext("2d")

const pAnimation = new ParticleAnimation(ctx, canvasSize, ctx2, canvasChartSize)

const renderLoop = new RenderLoop()
renderLoop.addToLoop(pAnimation)

connectGui(renderLoop)



