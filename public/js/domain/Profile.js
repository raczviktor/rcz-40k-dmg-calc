export class Profile {
    constructor({ name, attacks, ap, hit, wound, damage, traits = [] }) {
      if (!name) throw new Error('name required');
      if (!Number.isInteger(attacks) || attacks <= 0) throw new Error('attacks int > 0');
      if (!Number.isInteger(ap)) throw new Error('ap int');
  
      this.name = name;
      this.attacks = attacks;
      this.ap = ap;
      this.hit = { reroll:'none', modifier:0, sustained:0, lethal:false, skill:'MODEL', ...hit };
      this.wound = { reroll:'none', modifier:0, strength:'MODEL', ...wound };
      this.damage = { amount: 1, ...damage };
      this.traits = [...traits];
      Object.freeze(this);
    }
  }
  