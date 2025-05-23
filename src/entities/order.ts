import OrderItem from "./order-item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.calculateTotal();
  }

  calculateTotal(): number {
    return this._items.reduce((acc, item) => acc + item.total, 0);
  }
}