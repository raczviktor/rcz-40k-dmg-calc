import { buildChecksFromWeaponProfile } from './ProfileAdapter.js';
import { AttackResolver } from './AttackResolver.js';

export function resolveUnit({ unit, defender }) {
  const details = [];
  let totalDamage = 0;
  let totalUnsaved = 0;

  for (const { model, count } of unit.modelCollection) {
    for (const weapon of model.weaponCollection) {
      for (const profile of weapon.profileCollection) {
        const { attacks, damage, hit, wound, save } =
          buildChecksFromWeaponProfile({ model, weapon, profile, defender });
        const ar = new AttackResolver({ attacks, hit, wound, save, damage });
        const res = ar.compute();

        const dmg = res.total.expectedDamage * count;
        const uns = res.total.expectedUnsaved * count;

        totalDamage += dmg;
        totalUnsaved += uns;

        details.push({
          modelWS: model.WS, modelBS: model.BS, modelS: model.S,
          weapon: weapon.name, profile: profile.name,
          perModel: res.total.expectedDamage,
          count,
          subtotal: dmg
        });
      }
    }
  }

  return {
    total: { expectedUnsaved: totalUnsaved, expectedDamage: totalDamage },
    details
  };
}
