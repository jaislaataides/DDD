import Order from "../entities/order";
import OrderItem from "../entities/order-item";


describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrow("Id is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => new Order("123", "", [])).toThrow("Customer id is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => new Order("123", "123", [])).toThrow("Items are required");
  });

  it("should throw error if the item quantity is less than 0", () => {
    expect(() => new Order("123", "123", 
      [new OrderItem("1", "Product 1", "Item 1", 100, -1)])).toThrow("Quantity must be greater than zero");
  });

  it("should throw error if the item price is less than 0", () => {
    expect(() => new Order("123", "123", 
      [new OrderItem("1", "Product 1", "Item 1", -1, 1)])).toThrow("Price must be greater than zero");
  });

  it("should calculate total", () => {
    let order = new Order("123", "123", [new OrderItem("1", "Product 1", "Item 1", 100, 2)]);
    expect(order.calculateTotal()).toBe(200);

    order = new Order("123", "123", [new OrderItem("1", "Product 1", "Item 1", 100, 1), new OrderItem("2", "Product 2", "Item 2", 200, 2)]);
    expect(order.calculateTotal()).toBe(500);
  });

});