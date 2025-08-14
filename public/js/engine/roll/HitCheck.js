import { RerollKind } from './RerollKind.js';
import { clamp } from '../../util/math.js';

export class HitCheck {
  constructor({ skill, reroll = RerollKind.NONE, sustained = 0, lethal = false, modifier = 0 } = {}) {
    if (!Number.isInteger(skill) || skill < 2 || skill > 6) {
      throw new Error(`skill must be integer between 2..6, got: ${skill}`);
    }
    if (!Object.values(RerollKind).includes(reroll)) {
      throw new Error(`Unsupported reroll kind: ${reroll}`);
    }
    if (!Number.isInteger(sustained) || sustained < 0) {
      throw new Error(`sustained must be integer >= 0, got: ${sustained}`);
    }
    this.skill = skill;
    this.reroll = reroll;
    this.sustained = sustained;
    this.lethal = lethal;
    this.modifier = modifier;
    Object.freeze(this);
  }

  /**
   * @returns {{
   *  pHit: number,
   *  pCrit: number,
   *  expectedHits: number,
   *  expectedAutoWounds: number
   * }}
   */
  compute() {
    const need = clamp(this.skill - this.modifier, 2, 6);
    const pBase = (7 - need) / 6;
    const pHit = applyRerollSuccess(pBase, this.reroll);

    const pCrit = probSixAfterReroll(this.reroll);

    const expectedExtra = this.sustained * pCrit;

    return {
      need,
      pHit,
      pCrit,
      expectedHits: pHit + expectedExtra,
      expectedAutoWounds: this.lethal ? pCrit : 0
    };
  }
}

function applyRerollSuccess(p, kind) {
  switch (kind) {
    case RerollKind.NONE: return p;
    case RerollKind.ALL:  return p + (1 - p) * p;
    case RerollKind.ONES: return p + (1 / 6) * p;
    default: return p;
  }
}

function probSixAfterReroll(kind) {
  const p6 = 1 / 6;
  switch (kind) {
    case RerollKind.NONE: return p6;
    case RerollKind.ALL:  return p6 + (5 / 6) * p6;
    case RerollKind.ONES: return p6 + (1 / 6) * p6;    
    default: return p6;
  }
}
