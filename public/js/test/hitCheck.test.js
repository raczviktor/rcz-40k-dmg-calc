import { HitCheck } from '../engine/roll/HitCheck.js';
import { RerollKind } from '../engine/roll/RerollKind.js';

console.log('[hitCheck.test] start');

function approx(a,b,eps=1e-6){ if (Math.abs(a-b)>eps) throw new Error(`approx failed: exp ${b}, got ${a}`); }

let h = new HitCheck({ skill: 3, reroll: RerollKind.NONE, sustained: 0, lethal: false }).compute();
approx(h.pHit, 4/6);
approx(h.pCrit, 1/6);
approx(h.expectedHits, 4/6);
approx(h.expectedAutoWounds, 0);

h = new HitCheck({ skill: 3, reroll: RerollKind.ONES, sustained: 1, lethal: true }).compute();
approx(h.pHit, (4/6) + (1/6)*(4/6));
approx(h.pCrit, 7/36);
approx(h.expectedHits, h.pHit + 1 * (7/36));
approx(h.expectedAutoWounds, 7/36);

h = new HitCheck({ skill: 3, reroll: RerollKind.ALL }).compute();
approx(h.pCrit, 11/36);

h = new HitCheck({ skill: 4, modifier: +1, reroll: RerollKind.NONE }).compute();
if (h.need !== 3) throw new Error(`need should be 3+, got ${h.need}`);
approx(h.pHit, 4/6);

h = new HitCheck({ skill: 3, modifier: -1, reroll: RerollKind.NONE }).compute();
if (h.need !== 4) throw new Error(`need should be 4+, got ${h.need}`);
approx(h.pHit, 3/6);

console.log('[hitCheck.test] OK');
