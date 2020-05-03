
import { animation } from './Interfaces'
type renderFunc = () => void

export default class RenderLoop {
    public numStep = 0
    private isRunning: boolean = false
    private animations: Array<animation> = []
    private renderFunctions: Array<renderFunc> = []

    public addToLoop(ani: animation): void {
        this.animations.push(ani)
    }

    public init(args: Array<any>): void {
        this.renderFunctions = []
        
        this.animations.forEach(a => {
            this.renderFunctions.push(
                a.create(args)
            )
        })
    }

    public start(): void {
        this.isRunning = true
        this._recursiveRun()
    }

    public stop(): void {
        this.isRunning = false
    }

    public runSingleFrame(): void {
        this.renderFunctions.forEach(f => f())
    }

    public clearLoop(): void {
        this.stop()
        this.animations = []
        this.renderFunctions = []
    }
    
    private _recursiveRun(): void {
        this.numStep += 1
        requestAnimationFrame(() => {
            this.renderFunctions.forEach(f => f())
            if (this.isRunning) {
                this._recursiveRun()
            }
        })
    }
}