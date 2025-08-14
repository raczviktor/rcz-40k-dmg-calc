import { RerollKind } from './RerollKind.js';
import { clamp } from '../../util/math.js';


export class WoundCheck {
  constructor({ strength, toughness, reroll = RerollKind.NONE, modifier = 0 } = {}) {
    if (!Number.isInteger(strength) || strength <= 0) {
      throw new Error(`strength must be positive integer, got: ${strength}`);
    }
    if (!Number.isInteger(toughness) || toughness <= 0) {
      throw new Error(`toughness must be positive integer, got: ${toughness}`);
    }
    if (!Object.values(RerollKind).includes(reroll)) {
      throw new Error(`Unsupported reroll kind: ${reroll}`);
    }
    if (!Number.isInteger(modifier)) {
      throw new Error(`modifier must be integer, got: ${modifier}`);
    }
    this.strength = strength;
    this.toughness = toughness;
    this.reroll = reroll;
    this.modifier = modifier;
    Object.freeze(this);
  }

  /**
   * @returns {{ need: number, pWound: number }}
   */
  compute() {
    let need = baseNeed(this.strength, this.toughness);
    need = clamp(need - this.modifier, 2, 6);
    const pBase = (7 - need) / 6;
    const pWound = applyRerollSuccess(pBase, this.reroll);
    return { need, pWound };
  }
}

function baseNeed(S, T) {
  if (S >= 2 * T) return 2;
  if (S > T)      return 3;
  if (S === T)    return 4;
  if (S * 2 <= T) return 6;
  return 5;
}

function applyRerollSuccess(p, kind) {
  switch (kind) {
    case RerollKind.NONE: return p;
    case RerollKind.ALL:  return p + (1 - p) * p;
    case RerollKind.ONES: return p + (1 / 6) * p;
    default: return p;
  }
}
