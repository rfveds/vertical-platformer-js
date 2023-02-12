class Collisions {
    constructor({
        collisionData,
    }) {
        this.collisionData = collisionData
        this.collisionBlocks = []
    }

    /*
      Generates array of collisions.
    */
    generateCollisionBlocks() {
        const collisions2D = []
        for (let i = 0; i < this.collisionData.length; i += 36) {
            collisions2D.push(this.collisionData.slice(i, i + 36))
        }

        collisions2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol == 202) {
                    this.collisionBlocks.push(new CollisionBlock({
                        position: {
                            x: x * 16,
                            y: y * 16,
                        }
                    }))
                }
            })
        })
    }
}