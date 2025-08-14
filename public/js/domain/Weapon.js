export class Weapon {
  constructor({ name, type, profileCollection = [] }) {
    this.name = name;
    this.type = type;                  
    this.profileCollection = profileCollection;
  }
}
