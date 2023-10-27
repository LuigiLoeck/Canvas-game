const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  HIT: 5
}

class State {
  constructor(state) {
    this.state = state
  }
}

export class Sitting extends State {
  constructor(player) {
    super('SITTING')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 3
    this.player.frameY = 2
  }
  handleInput(input) {
    if (input.includes('a') || input.includes('d')) {
      this.player.setState(states.RUNNING, 1)
    } else if (input.includes(' ')) {
      this.player.setState(states.ROLLING, 2)
    }
  }
}

export class Running extends State {
  constructor(player) {
    super('RUNNING')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 5
    this.player.frameY = 4
  }
  handleInput(input) {
    if (input.includes('s')) {
      this.player.setState(states.SITTING, 0)
    } else if (input.includes('w')) {
      this.player.setState(states.JUMPING, 1)
    } else if (input.includes(' ')) {
      this.player.setState(states.ROLLING, 2)
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super('JUMPING')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    if (this.player.onGround()) {
      this.player.vy -= 30
    }
    this.player.maxFrame = 3
    this.player.frameY = 3
  }
  handleInput(input) {
    if (this.player.vy > this.player.weight) {
      this.player.setState(states.FALLING, 1)
    } else if (input.includes(' ')) {
      this.player.setState(states.ROLLING, 2)
    }
  }
}

export class Falling extends State {
  constructor(player) {
    super('FALLING')
    this.player = player
  }
  enter() {
    this.player.frameX = 4
    this.player.maxFrame = 1
    this.player.frameY = 3
  }
  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING, 1)
    }
  }
}

export class Rolling extends State {
  constructor(player) {
    super('ROLLING')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 5
    this.player.frameY = 0
  }
  handleInput(input) {
    if (!input.includes(' ') && this.player.onGround()) {
      this.player.setState(states.RUNNING, 1)
    } else if (!input.includes(' ') && !this.player.onGround()) {
      this.player.setState(states.FALLING, 1)
    } else if (input.includes('w') && this.player.onGround() && input.includes(' ')) {
      this.player.vy -= 25
    }
  }
}

export class Hit extends State {
  constructor(player) {
    super('HIT')
    this.player = player
  }
  enter() {
    this.player.frameX = 0
    this.player.maxFrame = 5
    this.player.frameY = 1
  }
  handleInput(input) {
    if (this.player.frameX >= 5 && this.player.onGround()) {
      this.player.setState(states.RUNNING, 1)
    } else if (this.player.frameX >= 5 && !this.player.onGround()) {
      this.player.setState(states.FALLING, 1)
    }
  }
}