import TribeMember from './TribeMember.js';

class TumbaYumba extends TribeMember {
  constructor(name) {
    super(name);
    this.className = 'tumbayumba'
    this.tools = [];
    this.dogs = [];
    this.secretPotato = '25 кг картошки';
    if (this.health > 20) {
      this.health -= 20;
    }
    this.iq += 40;
  }

  addTool(tool) {
    this.tools.push(tool);
    console.log(`${this.name} теперь имеет инструмент ${tool.name} с уроном ${tool.damage}`);
  }

  getInfoTools() {
    console.log(`${this.name} имеет инструмент ${this.tools.map(({ name, damage }) => `${name} с уроном ${damage}`).join(', ')}`);
  }

  getInfoDogs() {
    console.log(`${this.name} владеет собакой ${this.dogs.map(({ name, damage }) => `${name} с уроном ${damage}`).join(', ')}`);
  }

  addDog(dog) {
    this.dogs.push(dog);
    console.log(`${this.name} теперь владеет ${dog.name}`);
  }

  dogTraining(dog) {
    if (Math.random() + this.iq / 100 > 0.7) {
      dog.train();
    }
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
    if (this.dogs.length >= 0) {
      for (let i = 0; i < this.dogs.length; i += 1) {
        this.dogs[i].attack(target);
      }
    }
    if (this.tools.length === 0) {
      console.log(`${this.name} атакует рукой`);
      target.takeDamage(this.damage);
    } else {
      const mainTool = this.tools.at(0);
      const resultDamage = mainTool.damage + this.damage;
      if (mainTool.use() === true) {
        target.takeDamage(resultDamage);
      } else {
        this.tools.shift();
        this.attack(target);
      }
    }
    return true;
  }

  takeDamage(damage) {
    if (this.dogs.length > 0) {
      if (this.dogs[0].takeDamage(damage) === true) {
        this.dogs.shift();
      }
    } else {
      this.health -= damage;
      if (this.health <= 0) {
        console.log(`${this.name} помер`);
        return true;
      }
      console.log(`${this.name} получил ${damage} урона. Осталось ${this.health} здоровья`);
      return false;
    }
    return true;
  }
}

export default TumbaYumba;
