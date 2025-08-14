import { DicePool } from '../domain/dice/DicePool.js';
import { Die } from '../domain/dice/Die.js';
import { assert, assertEqual } from './assert.js';

console.log('[dicePool.test] start');

const p2d6 = DicePool.d6(2);
assertEqual(p2d6.min(), 2,  '2D6 min');
assertEqual(p2d6.max(), 12, '2D6 max');
assertEqual(p2d6.avg(), 7,  '2D6 avg should be 7');

const p3d3 = DicePool.d3(3);
assertEqual(p3d3.min(), 3,  '3D3 min');
assertEqual(p3d3.max(), 9,  '3D3 max');
assertEqual(p3d3.avg(), 6,  '3D3 avg should be 6');

const fakeLow = () => 0.0;
const fakeHigh = () => 0.9999;
assertEqual(p2d6.roll(fakeLow),  p2d6.min(), '2D6 roll low');
assertEqual(p2d6.roll(fakeHigh), p2d6.max(), '2D6 roll high');

assert(p2d6.equals(DicePool.d6(2)), 'equals same');
assert(!p2d6.equals(DicePool.d6(3)), 'equals diff count');

let threw = false;
try { new DicePool(0, Die.d6()); } catch (e) { threw = true; }
assert(threw, 'should throw on count <= 0');

console.log('[dicePool.test] OK');
