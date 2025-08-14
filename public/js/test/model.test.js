import { Model } from '../domain/Model.js';
import { Weapon } from '../domain/Weapon.js';
import { Profile } from '../domain/Profile.js';
import { assert, assertEqual } from './assert.js';

console.log('[model.test] start');

{
  const m = new Model({ WS: 3, BS: 4, S: 4, T: 4, Sv: 3, Inv: 5 });
  assertEqual(m.WS, 3, 'WS');
  assertEqual(m.BS, 4, 'BS');
  assertEqual(m.S, 4, 'S');
  assertEqual(m.T, 4, 'T');
  assertEqual(m.Sv, 3, 'Sv');
  assertEqual(m.Inv, 5, 'Inv');

  assert(Array.isArray(m.weaponCollection), 'weaponCollection should be an array');
  assertEqual(m.weaponCollection.length, 0, 'weaponCollection default empty');
}

{
  const pStd = new Profile({
    name: 'Standard',
    attacks: 2,
    ap: -1,
    hit:   { skill: 'MODEL' },
    wound: { strength: 'MODEL' },
    damage:{ amount: 1 }
  });

  const pLance = new Profile({
    name: 'Lance',
    attacks: 1,
    ap: -3,
    hit:   { skill: 'MODEL' },
    wound: { strength: 8 },
    damage:{ amount: 2 }
  });

  const wRanged = new Weapon({ name: 'Bolt Rifle', type: 'ranged', profileCollection: [pStd] });
  const wMelee  = new Weapon({ name: 'Chainsword', type: 'melee',  profileCollection: [pLance] });

  const m = new Model(
    { WS: 3, BS: 4, S: 4, T: 4, Sv: 3, Inv: 5 },
    [wRanged, wMelee]
  );

  assertEqual(m.weaponCollection.length, 2, 'weaponCollection length should be 2');

  assert(m.weaponCollection[0] instanceof Weapon, 'first item should be Weapon');
  assert(m.weaponCollection[1] instanceof Weapon, 'second item should be Weapon');

  assertEqual(m.weaponCollection[0].name, 'Bolt Rifle', 'first weapon name');
  assertEqual(m.weaponCollection[0].type, 'ranged', 'first weapon type');
  assertEqual(m.weaponCollection[1].name, 'Chainsword', 'second weapon name');
  assertEqual(m.weaponCollection[1].type, 'melee', 'second weapon type');

  assertEqual(m.weaponCollection[0].profileCollection[0].name, 'Standard', 'nested profile name');
}

console.log('[model.test] OK');
