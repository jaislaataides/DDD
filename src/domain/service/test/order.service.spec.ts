import Customer from "../../entities/customer";
import Order from "../../entities/order";
import OrderItem from "../../entities/order-item";
import OrderService from "../order.service";

describe('OrderService', () => {
  it('should get total of all orders', () => {
    const order1 = new Order("1", "1", [new OrderItem("1", "p1", "produto 1", 100, 1)]);  
    const order2 = new Order("2", "2", [new OrderItem("2", "p2", "produto 2", 200, 2)]);
    const order3 = new Order("3", "3", [new OrderItem("3", "p3", "produto 3", 300, 3)]);

    const orders = [order1, order2, order3];

    const total = OrderService.total(orders);

    expect(total).toBe(1400);
  });

  it("should place an order", () => {
    const customer = new Customer("1", "Customer 1", "fulano@gmail.com");
    const order = OrderService.placeOrder(customer, [new OrderItem("1", "p1", "produto 1", 100, 1)]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.calculateTotal()).toBe(100);
  });
});