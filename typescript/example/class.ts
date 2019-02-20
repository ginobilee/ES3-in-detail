class Person {
  static staticProp = 'static'
  private specy = 'human';
  protected gender: string;
  public name: string;
  constructor(gender: string, name: string) {
    this.gender = gender;
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Man extends Person {
  private pinusLength: number;
  constructor(name: string, pinusLength: number) {
    super('male', name);
    this.pinusLength = pinusLength;
  }
  toString() {
    return `Man: ${this.name} - ${this.pinusLength}`
  }
}

