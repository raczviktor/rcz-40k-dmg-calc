import { Defender } from '../domain/Defender.js';
import { assert, assertEqual } from './assert.js';

console.log('[defender.test] start');

{
  const d = new Defender({ toughness: 4, save: 3 });
  assertEqual(d.toughness, 4, 'toughness');
  assertEqual(d.save, 3, 'save');
  assertEqual(d.invuln, null, 'invuln default null');
  assertEqual(d.saveModifier, 0, 'saveModifier default 0');
  assertEqual(d.saveReroll, 'none', 'saveReroll default none');
}

{
  const d = new Defender({ toughness: 7, save: 2, invuln: 4, saveModifier: +1, saveReroll: 'all' });
  assertEqual(d.toughness, 7, 'toughness set');
  assertEqual(d.invuln, 4, 'invuln set');
  assertEqual(d.saveModifier, 1, 'saveModifier set');
  assertEqual(d.saveReroll, 'all', 'saveReroll set');
}

console.log('[defender.test] OK');
