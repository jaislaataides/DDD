import Address from "./address";

class Customer {
  private _id: string;
  private _name: string;
  private _email: string;
  private _active: boolean = false;
  private _address!: Address;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._email.length === 0) {
      throw new Error("Email is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  Address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get id(): string {
    return this._id;
  }

  changeEmail(email: string) {
    this._email = email;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
    this.validate();
  }

  deactivate() {
    this._active = false;
    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }
}

export default Customer;