import { clamp } from '../../util/math.js';

export class ProfileAdapter {
  constructor({ model, weapon, profile, defender = null }) {
    this.model = model;
    this.weapon = weapon;
    this.profile = profile;
    this.defender = defender;
  }

  build() {
    const { model, weapon, profile } = this;


    const skill =
      profile.hit.skill === 'MODEL'
        ? (weapon.type === 'melee' ? model.WS : model.BS)
        : profile.hit.skill;

    const hit = {
      need: clamp(skill + (profile.hit.modifier || 0), 2, 6),
      reroll: profile.hit.reroll || 'none',
      sustained: profile.hit.sustained || 0,
      lethal: !!profile.hit.lethal
    };

    const S = profile.wound.strength === 'MODEL' ? model.S : profile.wound.strength;
    const T = this.defender ? this.defender.toughness : null;
    const baseNeed = T ? woundNeedFromSvT(S, T) : profile.wound.need || 4;
    const wound = {
      need: clamp(baseNeed + (profile.wound.modifier || 0), 2, 6),
      reroll: profile.wound.reroll || 'none'
    };

    const ap = profile.ap || 0;
    const dmg = profile.damage?.amount || 1;

    const save = this.defender
      ? buildSaveCheck({
        save: this.defender.save,
        invuln: this.defender.invuln,
        ap,
        modifier: this.defender.saveModifier || 0,
        reroll: this.defender.saveReroll || 'none'
      })
      : { need: 7, reroll: 'none' };

    return {
      attacks: profile.attacks,
      damage: { amount: dmg },
      ap,
      hit,
      wound,
      save
    };
  }
}

function woundNeedFromSvT(S, T) {
  if (S >= 2 * T) return 2;
  if (S > T) return 3;
  if (S === T) return 4;
  if (S * 2 <= T) return 6;
  return 5;
}

function buildSaveCheck({ save, invuln, ap, modifier, reroll }) {

  const armorNeed = clamp(save - ap - modifier, 2, 6);
  const invulnNeed = invuln ? clamp(invuln, 2, 6) : null;
  const best = invulnNeed ? Math.min(armorNeed, invulnNeed) : armorNeed;
  return { need: best, reroll: reroll || 'none' };
}
