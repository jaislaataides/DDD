import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product.repository";
import OrderRepository from "./order.repository";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/entity/address";
import OrderItem from "../../domain/checkout/entity/order-item";
import Order from "../../domain/checkout/entity/order";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1", "fulano@email.com"); 
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.id, product.name, product.price, 2);
    const order = new Order("123", "123", [new OrderItem("1", product.id, product.name, product.price, 2)]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: "123" }, include: ["items"] });
    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.calculateTotal(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          product_id: orderItem.productId,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
        },
      ],
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1", "fulano@email.com");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address(address);
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel?.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      email: customer.email,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1", "fulano@email.com");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "Customer 1", "fulano@email.com");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.Address(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("456", "Customer 2", "fulano@email.com");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.Address(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});