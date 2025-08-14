export class Defender {
    /**
     * @param {object} p
     * @param {number} p.toughness
     * @param {number} p.save              
     * @param {number|null} [p.invuln=null]
     * @param {number} [p.saveModifier=0]  
     * @param {'none'|'1s'|'all'} [p.saveReroll='none']
     */
    constructor({ toughness, save, invuln = null, saveModifier = 0, saveReroll = 'none' }) {
      this.toughness = toughness;
      this.save = save;
      this.invuln = invuln;
      this.saveModifier = saveModifier;
      this.saveReroll = saveReroll;
    }
  }
  