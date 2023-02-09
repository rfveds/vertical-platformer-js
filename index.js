const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36 ){
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}
const collisionBlocks = []
floorCollisions2D.forEach((row, y)=> {
    row.forEach((symbol, x) => {
        if(symbol == 202){
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16,
                }
            }))
        }
    })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36 ){
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}
const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y)=> {
    row.forEach((symbol, x) => {
        if(symbol == 202){
            platformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16,
                }
            }))
        }
    })
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const player = new Player({
    position: {
        x: 100,
        y: 0
    },
    collisionBlocks: collisionBlocks,
    imageSrc: './img/warrior/Idle.png',
    frameRate: 8
}
)

const keys = {
    w: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    a: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}



function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    // scaling background
    c.save()
    c.scale(4,4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update() 
    collisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()
    })
    platformCollisionBlocks.forEach((collisionBlock) => {
        collisionBlock.update()
    })

    player.draw()
    player.update()

    // moving left and right
    player.velocity.x = 0 //stop movin if key isnt pressed 
    if (keys.d.pressed || keys.ArrowRight.pressed) {
        player.velocity.x = 3
    } else if (keys.a.pressed || keys.ArrowLeft.pressed) {
        player.velocity.x = -3
    }
    c.restore()
}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y = -10
            }
            break
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = true
            break
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    console.log(event)
    switch (event.key) {
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = false
            break;
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = false
            break
    }
})