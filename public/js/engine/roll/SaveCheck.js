import { RerollKind } from './RerollKind.js';
import {clamp} from '../../util/math.js';

function applyRerollSuccess(p, kind) {
  switch (kind) {
    case RerollKind.NONE: return p;
    case RerollKind.ALL:  return p + (1 - p) * p;
    case RerollKind.ONES: return p + (1 / 6) * p;
    default: return p;
  }
}

export class SaveCheck {
  constructor({ save, invuln = null, ap = 0, modifier = 0, reroll = RerollKind.NONE } = {}) {
    if (!Number.isInteger(save) || save < 2 || save > 7) {
      throw new Error(`save must be integer 2..7, got: ${save}`);
    }
    if (!(invuln == null || (Number.isInteger(invuln) && invuln >= 2 && invuln <= 7))) {
      throw new Error(`invuln must be null or integer 2..7, got: ${invuln}`);
    }
    if (!Number.isInteger(ap)) {
      throw new Error(`ap must be integer (e.g. -1), got: ${ap}`);
    }
    if (!Number.isInteger(modifier)) {
      throw new Error(`modifier must be integer, got: ${modifier}`);
    }
    if (!Object.values(RerollKind).includes(reroll)) {
      throw new Error(`Unsupported reroll kind: ${reroll}`);
    }
    this.save = save;
    this.invuln = invuln;
    this.ap = ap;
    this.modifier = modifier;
    this.reroll = reroll;
    Object.freeze(this);
  }

  /**
   * @returns {{
   *   used: 'armor'|'invuln',
   *   need: number,
   *   pSave: number,
   *   pFail: number
   * }}
   */
  compute() {
    const needArmor = clamp(this.save - this.modifier - this.ap, 2, 6);
    const hasInv = (this.invuln != null && this.invuln !== 7);
    const needInv = hasInv ? clamp(this.invuln, 2, 6) : Infinity;

    const useInv = needInv < needArmor;
    const need = useInv ? needInv : needArmor;

    const pBase = (7 - need) / 6;
    const pSave = applyRerollSuccess(pBase, this.reroll);
    const pFail = 1 - pSave;

    return { used: useInv ? 'invuln' : 'armor', need, pSave, pFail };
  }
}
