import TribeMember from './TribeMember.js';

class SigmaBoss extends TribeMember {
  constructor(name) {
    super(name);
    this.weapons = [];
    if (this.iq > 10) {
      this.iq -= 8;
    }
    if (this.health < 60) {
      this.health += 40;
    }
    this.damage += 5;
  }

  addWeapon(weapon) {
    this.weapons.push(weapon);
    console.log(`${this.name} теперь имеет оружие ${weapon.name} с уроном ${weapon.damage}`);
  }

  getInfoWeapons() {
    console.log(`${this.name} имеет оружие ${this.weapons.map(({ name, damage }) => `${name} с уроном ${damage}`).join(', ')}`);
  }

  attack(target) {
    if (this.health <= 0) {
      console.log(`${this.name} умер и не может продолжать бой`);
      return false;
    }
    console.log(`${this.name} атакует ${target.name}`);
    if (target.health <= 0) {
      console.log(`${target.name} уже умер`);
      return false;
    }
    if (this.weapons.length === 0) {
      console.log(`${this.name} атакует рукой`);
      target.takeDamage(this.damage);
    } else {
      const mainWeapon = this.weapons.at(0);
      const resultDamage = mainWeapon.damage + this.damage;
      if (mainWeapon.use() === true) {
        target.takeDamage(resultDamage);
      } else {
        this.weapons.shift();
        this.attack(target);
      }
    }
    return true;
  }
}

export default SigmaBoss;
