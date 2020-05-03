import RenderLoop from './RenderLoop'
import { particleColors, particleSettings, sliderAttributes} from './Interfaces'



const colors: particleColors = {
    default: "darkslategrey",
    almostInfected: "orange",
    infected: "darkred",
    immune: "lightgrey"
}

let pSettings: particleSettings = {
    radius: 5,
    colors: colors,
    velocity: 2,
    infectionRadius: 25,
    stepsUntilChange: 300,
    stepsUntilHealthy: 400,
    stepsUntilInfected: 60
}


let particleNumber: number = 50

const slidersAttributes: Array<sliderAttributes> = [
    { min: 5, max: 500, step: 5, value: particleNumber },
    { min: 0, max: 100, step: 1, value: pSettings.infectionRadius },
    { min: 1, max: 1000, step: 1, value: pSettings.stepsUntilChange },
    { min: 1, max: 2000, step: 5, value: pSettings.stepsUntilHealthy },
    { min: 5, max: 500, step: 5, value: pSettings.stepsUntilInfected },
]

const connectGui = (rLoop: RenderLoop) => {
    // init loop
    rLoop.init([particleNumber, pSettings])
    rLoop.runSingleFrame()

    // frontend state
    let isRunning: boolean = false

    // sliders
    const sliders: Array<HTMLInputElement> = []
    document.querySelectorAll('input').forEach(i => sliders.push(i))

    const disableSliders = (disabled: boolean, sliders: Array<HTMLInputElement>): void => {
        sliders.forEach(s => {
            s.disabled = disabled
        })
    }
    // apply attributes <keyof sliderAttributes>
    sliders.forEach((slider, idx) => {
        for (let [key, value] of Object.entries(slidersAttributes[idx])) {
            // console.log(idx, key, value)
            slider.setAttribute(key, value)
        }
    })

    // output labels
    const outputs: Array<HTMLOutputElement> = []
    document.querySelectorAll('output').forEach(o => outputs.push(o))

    outputs.forEach((output, idx) => {
        // console.log("test", slidersAttributes[idx])
        output.textContent = String(slidersAttributes[idx].value)
    })
    

    // listen to slider change
    sliders[0].addEventListener('change', () => {
        outputs[0].textContent = String(sliders[0].value)
        particleNumber = Number(sliders[0].value)
        rLoop.init([particleNumber, pSettings])
        rLoop.runSingleFrame()
    })

    type particleSettingsSliders = Omit<particleSettings, 'colors' | 'velocity' | 'radius'>
    let rangeSettings: Array<keyof particleSettingsSliders>
    rangeSettings = ['infectionRadius', 'stepsUntilChange', 'stepsUntilHealthy', 'stepsUntilInfected']

    // update other range values
    rangeSettings.forEach((s, idx) => {
        sliders[idx + 1].addEventListener('change', () => {
            outputs[idx + 1].textContent = String(sliders[idx + 1].value)
            pSettings[s] = Number(sliders[idx + 1].value)
            rLoop.init([particleNumber, pSettings])
            rLoop.runSingleFrame()
        })
    })


    // start/pause button
    const startButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("start_stop_button")

    startButton.addEventListener('click', () => {
        if (isRunning) {
            rLoop.stop()
            isRunning = false
            startButton.textContent = 'start'
        } else {
            rLoop.start()
            isRunning = true
            startButton.textContent = 'pause'
            disableSliders(true, sliders)
        }
    })

    // reset button
    const resetButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("reset_button")

    resetButton.addEventListener('click', () => {
        rLoop.stop()
        rLoop.init([particleNumber, pSettings])
        rLoop.runSingleFrame()
        isRunning = false
        startButton.textContent = 'start'
        disableSliders(false, sliders)
    })
}

export default connectGui