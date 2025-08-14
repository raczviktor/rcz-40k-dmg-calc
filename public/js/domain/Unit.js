export class Unit {
    /**
     * @param {object} p
     * @param {string} p.name
     * @param {{ model: any, count: number }[]} [p.modelCollection=[]]
     */
    constructor({ name, modelCollection = [] }) {
        this.name = name;
        this.modelCollection = modelCollection;
    }
}
