import {
    canvasShape,
    particleStatus,
    particleSettings,
} from './Interfaces'

export default class Particle {
    public x: number;
    public y: number;
    public infectedOthers: number;

    private infected: boolean;
    private almostInfected: boolean;
    private immune: boolean;
    private radiusShowing: boolean;
    private radiusCountdown: number;
    private infectedCountdown: number;
    private healthyCountdown: number;
    private randX: number;
    private randY: number;
    private counter: number;

    constructor(
        public id: number,
        public ctx: CanvasRenderingContext2D,
        public canvas: canvasShape,
        public settings: particleSettings
    ) {
        this.counter = 0
        this.infectedOthers = 0
        this.infectedCountdown = 0
        this.healthyCountdown = 0
        this.radiusCountdown = 0
        this.infected = false
        this.almostInfected = false
        this.immune = false
        this.radiusShowing = false
        this.randX = this._genRand()
        this.randY = this._genRand()
        this._randomStart()
    }

    private _genRand(): number {
        return 2 * Math.random() - 1
    }

    private _randomStart(): void {
        this.x = this.canvas.width * Math.random()
        this.y = this.canvas.height * Math.random()

        if (this.x <= 0.1 * this.canvas.width && this.y <= 0.1 * this.canvas.height) {
            this.infected = true
            this.healthyCountdown = this.settings.stepsUntilHealthy
        }
    }

    private _getColor(): string {
        if (this.almostInfected) {
            return this.settings.colors.almostInfected
        } else if (this.infected) {
            return this.settings.colors.infected
        } else if (this.immune) {
            return this.settings.colors.immune
        } else {
            return this.settings.colors.default
        }
    }

    private _draw(): void {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.settings.radius, 0, 2 * Math.PI, false)
        this.ctx.fillStyle = this._getColor()
        this.ctx.fill()

        if (this.radiusShowing) {
            this.ctx.beginPath()
            this.ctx.arc(this.x, this.y, this.settings.infectionRadius, 0, 2 * Math.PI, false)
            this.ctx.strokeStyle = this._getColor()
            this.ctx.lineWidth = 0.2
            this.ctx.stroke()
        }
    }

    public move(): void {
        if (this.counter % this.settings.stepsUntilChange === 0) {
            this.randX = this._genRand()
            this.randY = this._genRand()
        }
        this.counter += 1
        this.x += this.settings.velocity * this.randX
        this.y += this.settings.velocity * this.randY

        if (this.x >= this.canvas.width ||  this.x <= 0 ) {
            this.randX = - this.randX
        }
        
        if (this.y >= this.canvas.height || this.y <= 0) {
            this.randY = - this.randY
        }

        if (this.almostInfected) {
            if (this.infectedCountdown > 0) {
                this.infectedCountdown -= 1
            } else {
                this.infected = true
                this.almostInfected = false
                this.healthyCountdown = this.settings.stepsUntilHealthy
            }
        }

        if (this.infected) {
            if (this.healthyCountdown > 0) {
                this.healthyCountdown -= 1
            } else {
                this.immune = true
                this.infected = false
                this.radiusShowing = false
                this.radiusCountdown = 0
            }
        }

        if (this.radiusShowing) {
            if (this.radiusCountdown > 0) {
                this.radiusCountdown -= 1
            } else {
                this.radiusShowing = false
            }
        }

        this._draw()        
    }

    public setInfected(): boolean {
        if (!this.infected && !this.almostInfected && !this.immune) {
            this.infectedCountdown = this.settings.stepsUntilInfected
            this.almostInfected = true
            return true
        } else {
            console.log('cannot infect!!')
            return false
        }
    }

    public showRadius(steps: number): void {
        this.radiusShowing = true
        this.radiusCountdown = steps
    }

    public getStatus(): particleStatus {
        return {
            infected: this.infected,
            almostInfected: this.almostInfected,
            immune: this.immune
        }
    }

    static collisionDetect(b1: Particle, b2: Particle, dist: number): boolean {
        return Math.sqrt((b1.x - b2.x)**2 + (b1.y - b2.y)**2) <= dist
    }
}