import fs from 'fs';
import path from 'path';
import TumbaYumba from './classes/TumbaYumba.js';
import SigmaBoss from './classes/SigmaBoss.js';
import Tools from './classes/Tools';
import Weapons from './classes/Weapons.js';
import BattleDogs from './classes/BattleDogs';
import _ from 'lodash';

const setTribe = (member) => {
  const pathToFile = path.resolve('data/people.json');
  const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
  data.alive.push(member);
  console.log(data);
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
};

const editTribe = (member) => {
  const pathToFile = path.resolve('data/people.json');
  const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
  const filtered = data.alive.filter(({name}) => name !== member.name);
  filtered.push(member);
  data.alive = filtered;
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
}

const setDeadTribe = (member) => {
  const pathToFile = path.resolve('data/people.json');
  const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
  const filtered = data.alive.filter(({name}) => name !== member.name);
  data.alive = filtered;
  data.dead.push(member); 
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
} 

const backToClass = (nameToFind) => {
  const pathToFile = path.resolve('data/people.json');
  const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
  const found = data.alive.find((name) => name === nameToFind);
  let classObj;
  switch(found.className) {
    case 'tumbayumba':
      classObj = new TumbaYumba(nameToFind);
      break;
    case 'sigmaboss':
      classObj = new SigmaBoss(nameToFind);
      break;
    case 'tools':
      classObj = new Tools(nameToFind);
      break;
    case 'weapons':
      classObj = new Weapons(nameToFind);
      break;
    default:
      classObj = new BattleDogs(nameToFind);
      break;
  }
  const entries = Object.entries(found);
  for ([key, value] of entries) {
    if (_.isObject(value)) {
      classObj[key] = value.map((item) => backToClass(item));
    } else {
      classObj[key] = value;
    }
  }
}