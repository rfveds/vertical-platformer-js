
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 16;
canvas.height = 64 * 9;

const player = new Player();

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
    window.requestAnimationFrame(animate);
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw();
    player.update();

    if (keys.d.pressed || keys.ArrowRight.pressed) {
        player.velocity.x = 1;
    } else if (keys.a.pressed || keys.ArrowLeft.pressed) {
        player.velocity.x = -1;
    }

}

animate();

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            if (player.velocity.y === 0) {
                player.velocity.y = -10;
            }
            break;
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = true;
            break;
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = true;
            break;
    }
})

window.addEventListener('keyup', (event) => {
    console.log(event)
    switch (event.key) {
        case 'ArrowRight':
        case 'd':
            keys.d.pressed = false;
            break;
        case 'ArrowLeft':
        case 'a':
            keys.a.pressed = false;
            break;
    }
})