import { Die } from '../domain/dice/Die.js';
import { assert, assertEqual } from './assert.js';

console.log('[die.test] start');

const d3 = Die.d3();
assertEqual(d3.sides(), 3, 'D3 sides()');
assertEqual(d3.min(), 1, 'D3 min()');
assertEqual(d3.max(), 3, 'D3 max()');
assertEqual(d3.avg(), 2, 'D3 avg() should be 2');

const d6 = Die.d6();
assertEqual(d6.sides(), 6, 'D6 sides()');
assertEqual(d6.min(), 1, 'D6 min()');
assertEqual(d6.max(), 6, 'D6 max()');
assertEqual(d6.avg(), 4, 'D6 avg() should be rounded to 4');

assert(d3.equals(Die.d3()), 'equals() should be true for same type');
assert(!d3.equals(d6), 'equals() should be false for different type');

const fakeRng = () => 0.5;
const roll = d6.roll(fakeRng);
assert(roll >= d6.min() && roll <= d6.max(), 'roll() must be within range');

console.log('[die.test] OK');
