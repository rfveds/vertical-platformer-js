function collision({ object1, object2 }) {
  return (
    // bottom of player >= top collision block
    object1.position.y + object1.height >= object2.position.y &&
    object1.position.y <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}

function platformCollision({ object1, object2 }) {
  return (
    // bottom of player >= top collision block
    object1.position.y + object1.height >= object2.position.y &&
    // bottom of player <= bottom of collision block
    object1.position.y + object1.height <= object2.position.y + object2.height &&
    object1.position.x <= object2.position.x + object2.width &&
    object1.position.x + object1.width >= object2.position.x
  )
}