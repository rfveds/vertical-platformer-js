class Collision {
    constructor({
        collisionData,
        rows
    }) {
        this.collisionData = collisionData
        this.collisionBlocks = []
        this.rows = rows
    }

    /*
      Generates array of collisions.
    */
    generateCollisionBlocks() {
        const collisions2D = []
        for (let i = 0; i < this.collisionData.length; i += this.rows) {
            collisions2D.push(this.collisionData.slice(i, i + this.rows))
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