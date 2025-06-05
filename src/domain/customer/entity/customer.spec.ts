import Customer from "./customer";
import Address from "./address";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe", "john.doe@example.com")).toThrow(
      "Id is required"
    );
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("1", "", "john.doe@example.com")).toThrow(
      "Name is required"
    );
  });

  it("should throw error when email is empty", () => {
    expect(() => new Customer("1", "John Doe", "")).toThrow(
      "Email is required"
    );
  });

  it("should change name", () => {
    const customer = new Customer("1", "John Doe", "john.doe@example.com");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe", "john.doe@example.com");
    const address = new Address("Street", 123, "1234567890", "City");
    customer.Address(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John Doe", "john.doe@example.com");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is not set", () => {
    const customer = new Customer("1", "John Doe", "john.doe@example.com");
    expect(() => customer.activate()).toThrow(
      "Address is mandatory to activate a customer"
    );
  });

  it("should change email", () => {
    const customer = new Customer("1", "John Doe", "john.doe@example.com");
    customer.changeEmail("jane.doe@example.com");
    expect(customer.email).toBe("jane.doe@example.com");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John Doe", "john.doe@example.com");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(200);
  });
});