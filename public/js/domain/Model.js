export class Model {
  constructor(stats, weaponCollection = []) {
    const { WS, BS, S, T, Sv, Inv = null } = stats;
    Object.assign(this, { WS, BS, S, T, Sv, Inv });
    this.weaponCollection = [...weaponCollection];
    Object.freeze(this);
  }
}