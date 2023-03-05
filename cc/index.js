const canvas = document.querySelector('canvas')
const virtualKeys = document.querySelectorAll(".virtualKey");
const c = canvas.getContext('2d')

/* 
  Various resolution options 
*/
const resolutions = {
    standard: {
        width: 64 * 16,
        height: 64 * 9,
        scale: {
            x: 4,
            y: 4
        }
    }
}

/*
  Global gravity value for game.
*/
const gravity = 0.1

/* 
  Canvas dimensions.
*/
canvas.width = resolutions.standard.width
canvas.height = resolutions.standard.height

/* 
  Scaled canvas dimensions.
*/
const scale = resolutions.standard.scale
const scaledCanvas = {
    width: canvas.width / scale.x,
    height: canvas.height / scale.y
}

/* 
  Map size in tiles.
*/
const map = {
    size: {
        x: 36,
        y: 27
    }
}

/* 
  Tile size.
*/
const tile = {
    size: 16
}

/* 
  Floor collisions.
*/
const floorCollisionBlocks = new Collision({
    collisionData: floorCollisions,
    rowLength: map.size.x,
    tileSize: tile.size
})
floorCollisionBlocks.generateCollisionBlocks()

/* 
  Platform collisions.
*/
const platformCollisionBlocks = new Collision({
    collisionData: platformCollisions,
    rowLength: map.size.x,
    tileSize: tile.size
})
platformCollisionBlocks.generateCollisionBlocks()

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const backgroundImageHeight = 432
const camera = new Camera({
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height
    }
})

const player = new Player({
    position: {
        x: 100,
        y: 300
    },
    collisionBlocks: floorCollisionBlocks.collisionBlocks,
    platformCollisionBlocks: platformCollisionBlocks.collisionBlocks,
    imageSrc: './img/warrior/Idle.png',
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: './img/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {
            imageSrc: './img/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        Jump: {
            imageSrc: './img/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        Fall: {
            imageSrc: './img/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        FallLeft: {
            imageSrc: './img/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
        RunLeft: {
            imageSrc: './img/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 5,
        },
        IdleLeft: {
            imageSrc: './img/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        JumpLeft: {
            imageSrc: './img/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,
        },
    }
})

const enemy = new Player({
    position: {
        x: 150,
        y: 300
    },
    collisionBlocks: floorCollisionBlocks.collisionBlocks,
    platformCollisionBlocks: platformCollisionBlocks.collisionBlocks,
})

/* 
  Start animation loop 
*/
animate();

/* 
  Animation loop.
*/
function animate() {
    window.requestAnimationFrame(animate)
    c.save()

    /* 
      Scaling background image.
    */
    c.scale(scale.x, scale.y) // x, y axis
    c.translate(camera.position.x, camera.position.y)
    background.update()

    /* 
      Collision Blocks Outline.
    */
    // collisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.update()
    // })
    // platformCollisionBlocks.forEach((collisionBlock) => {
    //     collisionBlock.update()
    // })

    player.draw()
    player.checkForHorizontalCanvasCollision()
    player.update()

    enemy.draw()
    enemy.update()


    /*
      Player movement.
    */
    player.velocity.x = 0 //stop moving if key isnt pressed 
    if (keys.d.pressed) {
        player.switchSprite('Run')
        player.velocity.x = 2 // speed
        player.lastDirection = 'right'
        player.shouldPanCameraToTheLeft({ canvas, camera })
    } else if (keys.a.pressed) {
        player.switchSprite('RunLeft')
        player.velocity.x = -2 //speed
        player.lastDirection = 'left'
        player.shouldPanCameraToTheRight({ canvas, camera })
    } else if (player.velocity.y === 0) {
        if (player.lastDirection === 'right') player.switchSprite('Idle')
        else player.switchSprite('IdleLeft')
    }
    if (player.velocity.y < 0) {
        player.shouldPanCameraDown({ canvas, camera })
        if (player.lastDirection === 'right') player.switchSprite('Jump')
        else player.switchSprite('JumpLeft')
    } else if (player.velocity.y > 0) {
        player.shouldPanCameraUp({ canvas, camera })
        if (player.lastDirection === 'right') player.switchSprite('Fall')
        else player.switchSprite('FallLeft')
    }

    /*
      Attack action.
    */
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        console.log('attack')
    }

    c.restore()
}

/*
  Mouse events listener.
*/
for (let i = 0; i < virtualKeys.length; i++) {
    virtualKeys[i].addEventListener("mousedown", function (event) {
        switch (this.innerHTML) {
            case 'w':
                if (player.velocity.y === 0) {
                    player.velocity.y = -4
                }
                break
            case 'd':
                keys.d.pressed = true
                break
            case 'a':
                keys.a.pressed = true
                break
        }
    });
}
for (let i = 0; i < virtualKeys.length; i++) {
    virtualKeys[i].addEventListener("mouseup", function (event) {
        switch (this.innerHTML) {
            case 'd':
                keys.d.pressed = false
                break;
            case 'a':
                keys.a.pressed = false
                break
        }
    });
}

/*
  Touch events listener.
*/
for (let i = 0; i < virtualKeys.length; i++) {
    virtualKeys[i].addEventListener("touchstart", function (event) {
        switch (this.innerHTML) {
            case 'w':
                if (player.velocity.y === 0) {
                    player.velocity.y = -4
                }
                break
            case 'd':
                keys.d.pressed = true
                break
            case 'a':
                keys.a.pressed = true
                break
        }
    });
}
for (let i = 0; i < virtualKeys.length; i++) {
    virtualKeys[i].addEventListener("touchend", function (event) {
        switch (this.innerHTML) {
            case 'd':
                keys.d.pressed = false
                break;
            case 'a':
                keys.a.pressed = false
                break
        }
    });
}

/*
  Key events listener.
*/
window.addEventListener('keydown', (event) => {
    //console.log(event)
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y = -4
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
        case ' ':
            player.attack()
            break
    }
})
window.addEventListener('keyup', (event) => {
    //console.log(event)
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