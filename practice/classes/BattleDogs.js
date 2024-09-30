class BattleDogs {
  constructor(name) {
    this.name = name;
    this.health = 5 + Math.round(Math.random(0) * 25);
    this.trainingLevel = 0;
    this.damage = 5;
  }

  train() {
    this.damage += 5;
  }

  attack(target) {
    console.log(`${this.name} атакует ${target.name}`);
    target.takeDamage(this.damage);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      console.log(`${this.name} помер`);
      return true;
    }
    console.log(`${this.name} получил ${damage} урона. Осталось ${this.health} здоровья`);
    return false;
  }
}

export default BattleDogs;
