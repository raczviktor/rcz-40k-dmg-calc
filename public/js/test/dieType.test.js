import { DieType } from '../domain/dice/DieType.js';
import { assertEqual } from './assert.js';

console.log('[dieType.test] start');
assertEqual(DieType.D3, 'D3', 'DieType.D3 should be "D3"');
assertEqual(DieType.D6, 'D6', 'DieType.D6 should be "D6"');
console.log('[dieType.test] OK');
