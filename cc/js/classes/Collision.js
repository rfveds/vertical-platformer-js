class Collision {
    constructor({
        collisionData,
        rowLength,
        tileSize
    }) {
        this.collisionData = collisionData
        this.collisionBlocks = []
        this.rowLength = rowLength
        this.tileSize = tileSize
    }

    /*
      Generates collision blocks.
    */
    generateCollisionBlocks() {
        const collisions2D = []
        for (let i = 0; i < this.collisionData.length; i += this.rowLength) {
            collisions2D.push(this.collisionData.slice(i, i + this.rowLength))
        }

        collisions2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol == 202) {
                    this.collisionBlocks.push(new CollisionBlock({
                        position: {
                            x: x * this.tileSize,
                            y: y * this.tileSize,
                        }
                    }))
                }
            })
        })
    }
}