import { SaveCheck } from '../engine/roll/SaveCheck.js';
import { RerollKind } from '../engine/roll/RerollKind.js';

console.log('[saveCheck.test] start');

function approx(a,b,eps=1e-6){ if (Math.abs(a-b)>eps) throw new Error(`approx failed: exp ${b}, got ${a}`); }

let s = new SaveCheck({ save: 3, ap: -1 }).compute();
if (s.used !== 'armor' || s.need !== 4) throw new Error('3+ with AP-1 should be armor 4+');
approx(s.pSave, 3/6);

s = new SaveCheck({ save: 3, invuln: 4, ap: -3 }).compute();
if (s.used !== 'invuln' || s.need !== 4) throw new Error('should pick invuln 4+ over armor 6+');

s = new SaveCheck({ save: 3, ap: -1, modifier: +1 }).compute();
if (s.used !== 'armor' || s.need !== 3) throw new Error('3+ with AP-1 and +1 mod should be back to 3+');

s = new SaveCheck({ save: 2, ap: 0, modifier: +2 }).compute();
if (s.need !== 2) throw new Error('2+ should clamp to 2+ with big modifier');
s = new SaveCheck({ save: 6, ap: -3, modifier: 0 }).compute();
if (s.need !== 6) throw new Error('6+ should clamp to 6+ with big AP');

s = new SaveCheck({ save: 4, reroll: RerollKind.ALL }).compute();
approx(s.pSave, (3/6) + (3/6)*(3/6));

let threw = false;
try { new SaveCheck({ save: 8 }).compute(); } catch (_) { threw = true; }
if (!threw) throw new Error('should throw on invalid save');

console.log('[saveCheck.test] OK');
