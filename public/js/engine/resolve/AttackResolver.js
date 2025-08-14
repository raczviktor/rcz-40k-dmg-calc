import { HitCheck } from '../roll/HitCheck.js';
import { WoundCheck } from '../roll/WoundCheck.js';
import { SaveCheck } from '../roll/SaveCheck.js';

export class AttackResolver {
  constructor({ attacks, hit, wound, save, damage }) {
    if (!Number.isInteger(attacks) || attacks <= 0) throw new Error('attacks int > 0');
    if (!(hit instanceof HitCheck)) throw new Error('hit must be HitCheck');
    if (!(wound instanceof WoundCheck)) throw new Error('wound must be WoundCheck');
    if (!(save instanceof SaveCheck)) throw new Error('save must be SaveCheck');
    if (!(Number.isFinite(damage) && damage > 0)) throw new Error('damage > 0');

    this.attacks = attacks;
    this.hit = hit;
    this.wound = wound;
    this.save = save;
    this.damage = damage;
  }

  compute() {
    const h = this.hit.compute();
    const w = this.wound.compute();
    const s = this.save.compute();

    const regularHits = Math.max(0, h.expectedHits - h.expectedAutoWounds);
    const woundsFromRegular = regularHits * w.pWound;

    const unsavedPerAttack = (h.expectedAutoWounds + woundsFromRegular) * s.pFail;
    const dmgPerAttack = unsavedPerAttack * this.damage;

    return {
      perAttack: {
        expectedUnsaved: unsavedPerAttack,
        expectedDamage: dmgPerAttack
      },
      total: {
        attacks: this.attacks,
        expectedUnsaved: unsavedPerAttack * this.attacks,
        expectedDamage: dmgPerAttack * this.attacks
      }
    };
  }
}
