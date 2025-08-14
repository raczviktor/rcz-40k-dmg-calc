import { AttackResolver } from '../engine/resolve/AttackResolver.js';
import { HitCheck } from '../engine/roll/HitCheck.js';
import { WoundCheck } from '../engine/roll/WoundCheck.js';
import { SaveCheck } from '../engine/roll/SaveCheck.js';
import { RerollKind } from '../engine/roll/RerollKind.js';
import { assert } from './assert.js';

console.log('[attackResolver.test] start');
const approx = (a,b,eps=1e-9)=>{ if (Math.abs(a-b)>eps) throw new Error(`approx ${b} != ${a}`); };

{
  const hit = new HitCheck({ skill: 4 });
  const wound = new WoundCheck({ strength: 4, toughness: 4 });
  const save = new SaveCheck({ save: 3, ap: -1 });

  const ar = new AttackResolver({ attacks: 6, hit, wound, save, damage: 1 });
  const res = ar.compute();

  approx(res.perAttack.expectedUnsaved, 1/8);
  approx(res.total.expectedDamage, 6*(1/8));
}

{
  const hit = new HitCheck({ skill: 4, reroll: RerollKind.ALL });
  const wound = new WoundCheck({ strength: 4, toughness: 4 });
  const save = new SaveCheck({ save: 3, ap: 0 });

  const ar = new AttackResolver({ attacks: 2, hit, wound, save, damage: 1 });
  const res = ar.compute();

  const p = 3/6;
  const pHit = p + (1-p)*p;
  const expected = (pHit * (3/6) * (2/6)) * 2;
  approx(res.total.expectedDamage, expected);
}

{
  const hit = new HitCheck({ skill: 3 });
  const wound = new WoundCheck({ strength: 5, toughness: 4 });
  const save = new SaveCheck({ save: 4, ap: -1 });

  const ar = new AttackResolver({ attacks: 1, hit, wound, save, damage: 2 });
  assert(resFloat(ar.compute().total.expectedDamage) > 0, 'damage should be > 0');
}
function resFloat(x){ return Number.isFinite(x) ? x : NaN; }

console.log('[attackResolver.test] OK');
