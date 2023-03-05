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

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x 
   //&&
   // rectangle1.attackBox.position.x <=
   //   rectangle2.position.x + rectangle2.width &&
   // rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
   //  rectangle2.position.y &&
   // rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

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
