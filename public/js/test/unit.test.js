import { Unit } from '../domain/Unit.js';
import { Model } from '../domain/Model.js';
import { Weapon } from '../domain/Weapon.js';
import { Profile } from '../domain/Profile.js';
import { assert, assertEqual } from './assert.js';

console.log('[unit.test] start');

{
  const u = new Unit({ name: 'Empty' });
  assertEqual(u.name, 'Empty', 'unit name');
  assert(Array.isArray(u.modelCollection), 'modelCollection should be array');
  assertEqual(u.modelCollection.length, 0, 'modelCollection default empty');
}

{
  const profStd = new Profile({
    name: 'Standard',
    attacks: 2,
    ap: -1,
    hit:   { skill: 'MODEL' },
    wound: { strength: 'MODEL' },
    damage:{ amount: 1 }
  });
  const bolt = new Weapon({ name: 'Bolt Rifle', type: 'ranged', profileCollection: [profStd] });
  const modelA = new Model({ WS:3, BS:4, S:4, T:4, Sv:3, Inv:5 }, [bolt]);

  const profMelee = new Profile({
    name: 'Chain',
    attacks: 1,
    ap: 0,
    hit:   { skill: 'MODEL' },
    wound: { strength: 'MODEL' },
    damage:{ amount: 1 }
  });
  const chainsword = new Weapon({ name: 'Chainsword', type: 'melee', profileCollection: [profMelee] });
  const modelB = new Model({ WS:3, BS:4, S:4, T:4, Sv:3, Inv:5 }, [chainsword]);

  const u = new Unit({
    name: 'Tactical Squad',
    modelCollection: [
      { model: modelA, count: 5 },
      { model: modelB, count: 1 }
    ]
  });

  assertEqual(u.name, 'Tactical Squad', 'unit name');
  assertEqual(u.modelCollection.length, 2, 'modelCollection length');

  assert(u.modelCollection[0].model instanceof Model, 'first entry should hold a Model');
  assertEqual(u.modelCollection[0].count, 5, 'first count');
  assert(u.modelCollection[1].model instanceof Model, 'second entry should hold a Model');
  assertEqual(u.modelCollection[1].count, 1, 'second count');

  assertEqual(u.modelCollection[0].model.weaponCollection[0].name, 'Bolt Rifle', 'nested weapon');
  assertEqual(u.modelCollection[1].model.weaponCollection[0].type, 'melee', 'nested weapon type');
}

console.log('[unit.test] OK');
