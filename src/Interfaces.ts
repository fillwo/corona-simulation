
interface canvasShape {
    width: number,
    height: number
}

interface particleColors {
    default: string,
    almostInfected: string,
    infected: string,
    immune: string
}

interface particleStatus {
    infected: boolean,
    almostInfected: boolean,
    immune: boolean
}

interface particleSettings {
    radius: number,
    colors: particleColors,
    velocity: number,
    infectionRadius: number,
    stepsUntilChange: number,
    stepsUntilHealthy: number,
    stepsUntilInfected: number
}

interface animation {
    create: (args: Array<any>) => () => void,
    reset: () => void
}

interface sliderAttributes {
    min: number,
    max: number,
    step: number,
    value: number,
}

export {
    canvasShape,
    particleColors,
    particleStatus,
    particleSettings,
    animation,
    sliderAttributes,
}