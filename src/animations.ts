import Particle from './Particle'
import {
    canvasShape,
    particleSettings,
    animation
} from './Interfaces'

class ParticleAnimation implements animation {
    constructor(
        public ctx: CanvasRenderingContext2D,
        public canvasSize: canvasShape,
        public ctx2: CanvasRenderingContext2D = null,
        public canvasSize2: canvasShape = null
    ) {}

    public create(args: Array<any>) {
        const [numParticles, pSettings] = args

        let allParticles: Array<Particle> = []

        for (let i: number = 0; i < numParticles; i++) {
            allParticles.push(
                new Particle(i, this.ctx, this.canvasSize, <particleSettings> pSettings)
            )
        }

        let infected: Array<number> = []
        let immune: Array<number> = []
    
        return () => {
            this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
        
            allParticles.filter(p => p.getStatus().infected).forEach(infectedP => {
                allParticles
                    .filter(p => !p.getStatus().infected && !p.getStatus().almostInfected && !p.getStatus().immune)
                    .forEach(otherP => {
                        if (Particle.collisionDetect(infectedP, otherP, pSettings.infectionRadius)) {
                            if (otherP.setInfected()) {
                                infectedP.infectedOthers += 1
                                infectedP.showRadius(50)
                            }
                        }
                    })
            })
    
            allParticles.forEach(p => p.move())

            // keep score of infected / immune particles
            infected.push(allParticles.filter(p => p.getStatus().infected ).length)
            immune.push(allParticles.filter(p => p.getStatus().immune ).length)

            let numPoints = infected.length

            if (numPoints > 1500) {
                numPoints -= 1
                infected.shift()
                immune.shift()
            }

            // console.log('num values', numPoints)

            if (this.ctx2 && this.canvasSize2) {
                
                const xScale = (pointIdx: number): number => {
                    return pointIdx * (this.canvasSize2.width / numPoints)
                }
        
                const yScale = (pointIdx: number): number => {
                    const max = numParticles
                    const value = infected[pointIdx]
        
                    return this.canvasSize2.height - (this.canvasSize2.height / max) * value
                }

                const yScale2 = (pointIdx: number): number => {
                    const max = numParticles
                    const value = infected[pointIdx] + immune[pointIdx]
        
                    return this.canvasSize2.height - (this.canvasSize2.height / max) * value
                }

                this.ctx2.clearRect(0, 0, this.canvasSize2.width, this.canvasSize2.height)

                // draw immune
                immune.forEach((_: number, i: number) => {
                    if (i === 0) {
                        this.ctx2.beginPath()
                        this.ctx2.moveTo(xScale(i), yScale2(i))
                    } else {
                        this.ctx2.lineTo(xScale(i), yScale2(i))
                    }
                })

                this.ctx2.lineTo(this.canvasSize2.width, this.canvasSize2.height)
                this.ctx2.lineTo(0, this.canvasSize2.height)
                
                this.ctx2.strokeStyle = pSettings.colors.immune
                this.ctx2.fillStyle = pSettings.colors.immune

                if (immune.reduce((acc, curr) => acc + curr, 0) > 0 && immune.length > 2) {
                    this.ctx2.stroke()
                    this.ctx2.fill()
                }

                // draw infected
                infected.forEach((_: number, i: number) => {
                    if (i === 0) {
                        this.ctx2.beginPath()
                        this.ctx2.moveTo(xScale(i), yScale(i))
                    } else {
                        if (numPoints < 1000 || i % 5 === 0 || numPoints >= 1500)
                        this.ctx2.lineTo(xScale(i), yScale(i))
                    }
                })

                this.ctx2.lineTo(this.canvasSize2.width, this.canvasSize2.height)
                this.ctx2.lineTo(0, this.canvasSize2.height)
                
                this.ctx2.strokeStyle = pSettings.colors.infected
                this.ctx2.fillStyle = pSettings.colors.infected

                if (infected.reduce((acc, curr) => acc + curr, 0) > 0 && infected.length > 2) {
                    this.ctx2.stroke()
                    this.ctx2.fill()
                }

            }
        }
    }

    public reset() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    }
}


export { ParticleAnimation }