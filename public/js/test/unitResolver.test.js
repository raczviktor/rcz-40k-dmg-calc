import { resolveUnit } from '../engine/resolve/UnitResolver.js';
import { Unit } from '../domain/Unit.js';
import { Model } from '../domain/Model.js';
import { Weapon } from '../domain/Weapon.js';
import { Profile } from '../domain/Profile.js';

console.log('[unitResolver.test] start');
const approx = (a,b,eps=1e-9)=>{ if (Math.abs(a-b)>eps) throw new Error(`approx ${b} != ${a}`); };

const profBolt = new Profile({
  name:'Standard', attacks:2, ap:-1,
  hit:{ skill:'MODEL' }, wound:{ strength:'MODEL' }, damage:{ amount:1 }
});
const profSword = new Profile({
  name:'Slash', attacks:1, ap:0,
  hit:{ skill:'MODEL' }, wound:{ strength:'MODEL' }, damage:{ amount:1 }
});
const bolt = new Weapon({ name:'Bolt Rifle', type:'ranged', profileCollection:[profBolt] });
const sword = new Weapon({ name:'Chainsword', type:'melee', profileCollection:[profSword] });

const modelA = new Model({ WS:3, BS:4, S:4, T:4, Sv:3, Inv:5 }, [bolt]);
const modelB = new Model({ WS:3, BS:4, S:4, T:4, Sv:3, Inv:5 }, [sword]);

const unit = new Unit({
  name:'Tactical',
  modelCollection: [
    { model: modelA, count: 5 },
    { model: modelB, count: 1 }
  ]
});
const defender = { toughness: 4, save: 3, invuln: null, saveModifier: 0, saveReroll: 'none' };

const res = resolveUnit({ unit, defender });

const expected = 1.25 + (1/9);
approx(res.total.expectedDamage, expected);

console.log('[unitResolver.test] OK');
