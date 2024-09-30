import Items from './Items.js';

class Weapons extends Items {
  use() {
    this.durability -= 1;
    if (this.durability <= 0) {
      console.log(`Оружие ${this.name} сломалось`);
      return false;
    }
    console.log(`У оружия ${this.name} осталось  ${this.durability} прочности`);
    return true;
  }
}

export default Weapons;
