import { WoundCheck } from '../engine/roll/WoundCheck.js';
import { RerollKind } from '../engine/roll/RerollKind.js';

console.log('[woundCheck.test] start');

function approx(a, b, eps = 1e-6) {
  if (Math.abs(a - b) > eps) { throw new Error(`approx failed: expected ${b}, got ${a}`); }
}

let w = new WoundCheck({ strength: 4, toughness: 4, reroll: RerollKind.NONE }).compute();
if (w.need !== 4) throw new Error(`need should be 4, got ${w.need}`);
approx(w.pWound, 3/6);

w = new WoundCheck({ strength: 4, toughness: 4, reroll: RerollKind.ALL }).compute();
approx(w.pWound, (3/6) + (3/6)*(3/6)); 

w = new WoundCheck({ strength: 4, toughness: 4, reroll: RerollKind.ONES }).compute();
approx(w.pWound, (3/6) + (1/6)*(3/6)); 

w = new WoundCheck({ strength: 8, toughness: 4, modifier: 1 }).compute();
if (w.need !== 2) throw new Error(`need should be 2 with clamp, got ${w.need}`);

console.log('[woundCheck.test] OK');