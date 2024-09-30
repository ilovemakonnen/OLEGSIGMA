class TribeMember {
  constructor(name) {
    this.name = name;
    this.age = Math.round(Math.random() * 100);
    this.health = Math.round(Math.random() * 100);
    this.damage = Math.round(Math.random() * 10);
    this.iq = Math.round(Math.random() * 20);
  }

  getInfo() {
    console.log(`${this.name} в возрасте ${this.age} лет имеет ${this.health} здоровья и наносит ${this.damage} урона. IQ ${this.iq}`);
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

export default TribeMember;
