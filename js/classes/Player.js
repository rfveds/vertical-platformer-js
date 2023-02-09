class Player {
    constructor({ position, collisionBlocks }) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 1
        }
        this.height = 100 / 4
        this.width = 100 / 4
        this.collisionBlocks = collisionBlocks

        this.gravity = 0.5
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.checkForHorizontalCollisons()
        this.applyGravity()
        this.checkForVerticalCollisons()
    }

    checkForHorizontalCollisons() {
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            if(collision({
                object1: this,
                object2: collisionBlock
            })){
                if(this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }
                if(this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y
        this.velocity.y += this.gravity
    }

    checkForVerticalCollisons() {
        for (let i = 0; i < this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]
            if(collision({
                object1: this,
                object2: collisionBlock
            })){
                if(this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    break
                }
                if(this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + this.height - 0.01
                    break
                }
            }
        }
    }
}


