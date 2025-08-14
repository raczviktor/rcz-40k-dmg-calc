import { Die } from './Die.js';

export class DicePool {
    constructor(count, die) {
        if (!Number.isInteger(count) || count <= 0) {
            throw new Error(`DicePool count must be positive integer, got: ${count}`);
        }
        if (!(die instanceof Die)) {
            throw new Error('DicePool requires a Die instance');
        }
        this.count = count;
        this.die = die;
        Object.freeze(this);
    }

    static d3(count) { return new DicePool(count, Die.d3()); }
    static d6(count) { return new DicePool(count, Die.d6()); }

    min() { return this.count * this.die.min(); }
    max() { return this.count * this.die.max(); }
    avg() {
        return Math.round(this.count * ((this.die.sides() + 1) / 2));
    }

    roll(rng = Math.random) {
        let sum = 0;
        for (let i = 0; i < this.count; i++) {
            sum += this.die.roll(rng);
        }
        return sum;
    }

    toString() { return `${this.count}${this.die.type}`; }
    equals(other) {
        return other instanceof DicePool
            && this.count === other.count
            && this.die.equals(other.die);
    }
}
