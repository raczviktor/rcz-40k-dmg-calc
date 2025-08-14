import { ProfileAdapter } from '../resolve/ProfileAdapter.js';
import { Defender } from '../domain/Defender.js';

it('ProfileAdapter: defender property-alapú injektálás működik', () => {
  const adapter = new ProfileAdapter({
    model: { WS: 3, BS: 4, S: 4 },
    weapon: { type: 'ranged' },
    profile: {
      attacks: 10, ap: -1,
      hit: { skill: 'MODEL', reroll: 'none', modifier: 0, sustained: 0, lethal: false },
      wound: { strength: 'MODEL', reroll: 'all', modifier: 0 },
      damage: { amount: 1 }
    },
    defender: new Defender({ toughness: 4, save: 3, invuln: null, saveModifier: 0, saveReroll: 'none' })
  });

  const built = adapter.build();
  expect(built.hit.need).toBe(4);   
  expect(built.wound.need).toBe(4); 
  expect(built.save.need).toBe(4);  
});
