const BACKGROUND = "#101010"
const FOREGROUND = "#50FF50"
const FPS = 60
const vs = [
    {x: 0.5, y: 0.5, z: 0.5},
    {x: -0.5, y: 0.5, z: 0.5},
    {x: 0.5, y: -0.5, z: 0.5},
    {x: -0.5, y: -0.5, z: 0.5},

    {x: 0.5, y: 0.5, z: -0.5},
    {x: -0.5, y: 0.5, z: -0.5},
    {x: 0.5, y: -0.5, z: -0.5},
    {x: -0.5, y: -0.5, z: -0.5}
]

let dz = 1      // keeps track of the z offset for the point

demo.width = innerWidth
demo.height = window.innerHeight
console.log(demo)

const ctx = demo.getContext("2d")
console.log(ctx)

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, demo.width, demo.height)
}

function point({x, y}) {
    const s = 10
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x-s/2, y-s/2, s, s)
}

function screen(p) {
    // translate -1 to 1 range to 0 to width/height
    return {
        x: (p.x+1)/2 * demo.width,
        y: (1-(p.y+1)/2) * demo.height
    }
}

function project({x, y, z}) {
    return {
        x: x / z,
        y: y / z
    }
}

function translateZ({x, y, z}, dz) {
    return { x, y, z: z+dz }
}

function frame() {
    const dt = 1 / FPS
    dz += 1 * dt
    clear()

    for (const v of vs)
        point(screen(project(translateZ(v, dz))))

    setTimeout(frame, 1000/FPS)     // reschedules the frame
}
setTimeout(frame, 1000/FPS)
