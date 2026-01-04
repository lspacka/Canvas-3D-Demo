const BACKGROUND = "#101010"
const FOREGROUND = "#50FF50"
const FPS = 60

let dz = 1.5      // keeps track of the z offset for the point
let angle = 0

demo.width = window.innerWidth
demo.height = window.innerHeight
console.log(demo)

const ctx = demo.getContext("2d")
console.log(ctx)

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, demo.width, demo.height)
}

function point({x, y}, s) {
    // const s = 10
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x-s/2, y-s/2, s, s)
}

function line(p1, p2) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function screen(p) {
    // translates -1 to 1 range to 0 to width/height
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

function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle)
    const s = Math.sin(angle)

    return {
        x: x * c-z * s,
        y,
        z: x * s+z * c
    }
}

let ps = 7        
function frame() {
    const dt = 1 / FPS
    // dz += 1 * dt
    angle += Math.PI * dt
    clear()

    // for (const v of vs)
    //     point(screen(project(translateZ(rotate_xz(v, angle), dz))), ps)

    for (const f of fs) {
        for (let i = 0; i < f.length; ++i) {
            const a = vs[f[i]];
            const b = vs[f[(i+1)%f.length]];
            line(screen(project(translateZ(rotate_xz(a, angle), dz))),
                 screen(project(translateZ(rotate_xz(b, angle), dz))))
        }
    }

    setTimeout(frame, 1000/FPS)     // reschedules the frame
}
setTimeout(frame, 1000/FPS)
