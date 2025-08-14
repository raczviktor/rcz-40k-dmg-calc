import { Weapon } from '../domain/Weapon.js';

console.log('[weapon.test] start');

const w = new Weapon({
  name: 'Bolt Rifle',
  type: 'ranged',
  profileCollection: [{ name:'Standard', attacks:2, ap:-1, hit:{skill:'MODEL'}, wound:{strength:'MODEL'}, damage:{amount:1} }]
});

if (w.name !== 'Bolt Rifle') throw new Error('name mismatch');
if (w.type !== 'ranged') throw new Error('type mismatch');
if (!Array.isArray(w.profileCollection)) throw new Error('profileCollection should be array');
if (w.profileCollection.length !== 1) throw new Error('profileCollection length mismatch');

console.log('[weapon.test] OK');
