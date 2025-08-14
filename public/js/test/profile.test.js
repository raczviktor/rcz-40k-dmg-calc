import { Profile } from '../domain/Profile.js';
import { assert, assertEqual } from './assert.js';

console.log('[profile.test] start');

{
  const p = new Profile({
    name: 'Standard',
    attacks: 2,
    ap: -1,
    hit:   { skill: 'MODEL' },   
    wound: { strength: 'MODEL' },      
    damage:{ amount: 2 }              
  });

  assertEqual(p.name, 'Standard', 'name');
  assertEqual(p.attacks, 2, 'attacks');
  assertEqual(p.ap, -1, 'ap');

  assertEqual(p.hit.skill, 'MODEL', 'hit.skill');
  assertEqual(p.hit.reroll, 'none', 'hit.reroll default');
  assertEqual(p.hit.modifier, 0, 'hit.modifier default');
  assertEqual(p.hit.sustained, 0, 'hit.sustained default');
  assertEqual(p.hit.lethal, false, 'hit.lethal default');

  assertEqual(p.wound.strength, 'MODEL', 'wound.strength');
  assertEqual(p.wound.reroll, 'none', 'wound.reroll default');
  assertEqual(p.wound.modifier, 0, 'wound.modifier default');

  assertEqual(p.damage.amount, 2, 'damage.amount');

  assert(Array.isArray(p.traits), 'traits should be array');
  assertEqual(p.traits.length, 0, 'traits default empty');
}

{
  const p = new Profile({
    name: 'Lance',
    attacks: 1,
    ap: -3,
    hit:   { skill: 3, reroll: 'all', modifier: +1, sustained: 2, lethal: true },
    wound: { strength: 8, reroll: '1s', modifier: +1 },
    damage:{ amount: 3 },
    traits: ['Devastating Wounds']
  });

  assertEqual(p.name, 'Lance', 'name override');
  assertEqual(p.attacks, 1, 'attacks override');
  assertEqual(p.ap, -3, 'ap override');

  assertEqual(p.hit.skill, 3, 'hit.skill override');
  assertEqual(p.hit.reroll, 'all', 'hit.reroll override');
  assertEqual(p.hit.modifier, +1, 'hit.modifier override');
  assertEqual(p.hit.sustained, 2, 'hit.sustained override');
  assertEqual(p.hit.lethal, true, 'hit.lethal override');

  assertEqual(p.wound.strength, 8, 'wound.strength override');
  assertEqual(p.wound.reroll, '1s', 'wound.reroll override');
  assertEqual(p.wound.modifier, +1, 'wound.modifier override');

  assertEqual(p.damage.amount, 3, 'damage.amount override');

  assertEqual(p.traits.length, 1, 'traits length');
  assertEqual(p.traits[0], 'Devastating Wounds', 'traits content');
}

console.log('[profile.test] OK');
