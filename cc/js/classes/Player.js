/* 
  Player class.
*/
class Player extends Sprite {
  constructor({
    position,
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc = '',
    frameRate = '',
    scale = 0.5,
    animations = '',
  }) {
    super({ imageSrc, frameRate, scale })
    this.position = position
    this.velocity = {
      x: 0,
      y: 0,
    }

    this.collisionBlocks = collisionBlocks
    this.platformCollisionBlocks = platformCollisionBlocks
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    }

    this.animations = animations
    this.lastDirection = 'right'

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image
    }

    this.camerabox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y
      },
      width: 20,
      height: 10
    }
    this.isAttacking
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return

    this.currentFrame = 0
    this.image = this.animations[key].image
    this.frameBuffer = this.animations[key].frameBuffer
    this.frameRate = this.animations[key].frameRate
  }

  updateCamerabox() {
    this.camerabox = {
      position: {
        x: this.position.x - 50,
        y: this.position.y,
      },
      width: 200,
      height: 80,
    }
  }

  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 576 ||
      this.hitbox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0
    }
  }

  shouldPanCameraToTheLeft({ canvas, camera }) {
    const cameraboxRightSide = this.camerabox.position.x + this.camerabox.width
    const scaledDownCanvasWidth = canvas.width / 4

    if (cameraboxRightSide >= 576) return

    if (
      cameraboxRightSide >=
      scaledDownCanvasWidth + Math.abs(camera.position.x)
    ) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraToTheRight({ canvas, camera }) {
    if (this.camerabox.position.x <= 0) return

    if (this.camerabox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x
    }
  }

  shouldPanCameraDown({ canvas, camera }) {
    if (this.camerabox.position.y + this.velocity.y <= 0) return

    if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y
    }
  }

  shouldPanCameraUp({ canvas, camera }) {
    if (
      this.camerabox.position.y + this.camerabox.height + this.velocity.y >=
      432
    )
      return

    const scaledCanvasHeight = canvas.height / 4

    if (
      this.camerabox.position.y + this.camerabox.height >=
      Math.abs(camera.position.y) + scaledCanvasHeight
    ) {
      camera.position.y -= this.velocity.y
    }
  }

  update() {
    /* 
      Camera Box outline.
    */
    // c.fillStyle = 'rgba(0, 0, 255, 0.2)'
    // c.fillRect(
    //   this.camerabox.position.x,
    //   this.camerabox.position.y,
    //   this.camerabox.width,
    //   this.camerabox.height
    // )

    /* 
      Image outline.
    */
    // c.fillStyle = 'rgba(0, 255, 0, 0.2)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    /* 
      Hitbox outline.
    */
    // c.fillStyle = 'rgba(255, 0, 0, 0.2)'
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )

    /* 
      Attack box outline.
    */
    c.fillStyle = 'rgba(0,0,255,0.25)'
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    )

    this.updateFrames()
    this.updateHitbox()
    this.updateAttackBox()
    this.updateCamerabox()
    this.position.x += this.velocity.x
    this.updateHitbox()
    this.checkForHorizontalCollisions()
    this.applyGravity()
    this.updateHitbox()
    this.checkForVerticalCollisions()
  }

  attack() {
    this.isAttacking = true
    //console.log('attack')
    setTimeout(() => {
      this.isAttacking = false
    }, 100)
  }

  updateAttackBox() {
    this.attackBox = {
      position: {
        x: this.position.x + 33,
        y: this.position.y + 30
      },
      width: 20,
      height: 10
    }
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 36,
        y: this.position.y + 26,
      },
      width: 8,
      height: 27,
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0

          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width

          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0

          const offset = this.hitbox.position.x - this.position.x

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }
      }
    }
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0

          const offset = this.hitbox.position.y - this.position.y

          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
      }
    }

    // platform collision blocks
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = this.platformCollisionBlocks[i]

      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = platformCollisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity
    this.position.y += this.velocity.y
  }
}