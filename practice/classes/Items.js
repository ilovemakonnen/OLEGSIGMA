class Items {
  constructor(name) {
    this.name = name;
    this.durability = 5 + Math.round(Math.random() * 5);
    this.damage = 5 + Math.round(Math.random() * 5);
  }
}

export default Items;
