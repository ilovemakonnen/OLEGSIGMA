import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import readlineSync from 'readline-sync';
import SigmaBoss from './classes/sigma.js';
import BattleDog from './classes/battle-dog.js';
import Tool from './classes/tool.js';
import TumbaUmba from './classes/tumbaumba.js';
import Weapon from './classes/weapon.js';

const getPath = () => path.resolve('data/units.json');

const readData = () => JSON.parse(fs.readFileSync(getPath(), 'utf-8'));

const updateJSON = (data) => fs.writeFileSync(getPath(), JSON.stringify(data, null, 2), 'utf-8');

const setObject = (member) => {
  const data = readData();
  member.className === 'BattleDog' ? data.dog.push(member)
    : member.className === 'Tool' || member.className === 'Weapon'
      ? data.item.push(member) : data.alive.push(member);
  updateJSON(data);
};
// setTribe();
const createObject = (key, name) => {
  const classes = ['SigmaBoss', 'TumbaUmba', 'Tool', 'Weapon', 'BattleDog']
  const templates = {
    0: new SigmaBoss(name),
    1: new TumbaUmba(name),
    2: new Tool(name),
    3: new Weapon(name),
    4: new BattleDog(name),
  }
  return templates[classes.indexOf(key)];
}

const  addItem = () => {
  const data = readData();

  const listOfNames = data.alive.map(({ name }) => name);
  const indexOfName = readlineSync.keyInSelect(listOfNames, 'Кому добавляем: ');

  let person = data.alive.at(indexOfName);
  let item;
  if (person.className === 'SigmaBoss') {
    const listOfItems = data.item.map(({ name }) => name);
    const indexOfItem = readlineSync.keyInSelect(listOfItems, 'Что добавляем: ');
    item = data.item.at(indexOfItem);
  } else {
    const choice = readlineSync.keyInSelect(['собаки', 'инструменты'], 'Кого/что добавляем? ');
    if (choice === 0) {
      const listOfDogs = data.dog.map(({ name }) => name);
      const indexOfDog = readlineSync.keyInSelect(listOfDogs, 'Кого добавляем: ');
      item = data.dog.at(indexOfDog);
    } else {
      const listOfTools = data.item.filter(({className}) => className === 'Tool');
      const listOfToolNames = listOfTools.map(({name}) => name);
      const indexOfTool = readlineSync.keyInSelect(listOfToolNames, 'Что добавляем: ');
      item = listOfTools.at(indexOfTool);
    }
  }
  person = backToClass(person.name);
  item = backToClass(item.name);
  if (person.className === 'SigmaBoss') {
    person.addWeapon(item);
  } else if (item.className === 'BattleDog') {
    person.addDog(item);
  } else { 
    person.addTools(item);
  }
  // updateJSON()
  editObject(person);
};
// ф-ция, которая терминально создает объект класса и сохраняет его
const createData = () => {
  const classes = ['SigmaBoss', 'TumbaUmba', 'Tool', 'Weapon', 'BattleDog'];
  const index = readlineSync.keyInSelect(classes, 'Кого создаем? ');

  if (index === -1) {
    return false;
  }

  const className = classes[index];
  const name = readlineSync.question('Имя/название: ');
  const classObj = createObject(className, name);
//  let classObj;
//  switch (className) {
//    case 'TumbaUmba':
//      classObj = new TumbaUmba(name);
//      break;
//    case 'SigmaBoss':
//      classObj = new SigmaBoss(name);
//      break;
//    case 'Tool':
//      classObj = new Tool(name);
//      break;
//    case 'Weapon':
//      classObj = new Weapon(name);
//      break;
//    default:
//      classObj = new BattleDog(name);
//      break;
//  }

  console.log(classObj);
  setObject(classObj);
  return true;
};
// изменение данных о состоянии объекта
const editObject = (member) => {
  const data = readData();
  const key = member.className === 'BattleDog' 
  ? 'dog' : ['Tool', 'Weapon'].includes(member.className)
    ? 'item' : 'alive';
  const filtered = data.alive.filter(({ name }) => name !== member.name);
  filtered.push(member);
  data[key] = filtered;

  updateJSON(data);
};

// удаление объекта
const setDeadTribe = (member) => {
  const data = readData();
  const filtered = data.alive.filter(({ name }) => name !== member.name);
  data.alive = filtered;
  data.dead.push(member);
  updateJSON(data);
};

// возвращаем объект json в объект класса
const backToClass = (nameToFind) => {
  const data = readData();
  const keys = Object.keys(data);
  const found = keys.map((key) => data[key].filter(({name}) => name === nameToFind)).flat().at(0);
  // const objEntries = Object.entries(data);
  const classObj = createObject(found.className, nameToFind);
  const entries = Object.entries(found);
  // [[k1, v1], [k2, v2]]
  // for ([key, value] of entries) {
  //   if (_.isObject(value)) {
  //     classObj[key] = value.map((item) => backToClass(item));
  //   } else {
  //     classObj[key] = value;
  //   }
  // }
  entries.forEach(([key, value]) => {
    classObj[key] = _.isObject(value)
      ? value.map((item) => backToClass(item.name))
      : value;
  });
  return classObj;
};

// если предмет передали какому-то аборигену,то этот предмет удаляется из item
// продумать механику перестрелки 
export {createData, backToClass, readData, addItem}
