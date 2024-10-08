import Items from './Items.js';

class Tools extends Items {
  constructor(name) {
    super(name);
    this.damage -= 3;
  }

  use() {
    this.durability -= 2;
    if (this.durability <= 0) {
      console.log(`Инструмент ${this.name} сломалось`);
      return false;
    }
    console.log(`У инструмента ${this.name} осталось ${this.durability} прочности`);
    return true;
  }
}

export default Tools;