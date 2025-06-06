import Address from "../address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create a costumer", () => {
    let customer = CustomerFactory.create("John", "john@example");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.email).toBe("john@example");
    expect(customer.address).toBeUndefined();
  });
  it("should create a customer with an address", () => {
    const address = new Address("rua 1", 12, '12345664', 'cidade tal');
    let customer = CustomerFactory.createWithAddress(
      "John",
      "john@example",
      address
    );
    expect(customer.id).toBeDefined();
    expect(customer.address).toBeDefined();
    expect(customer.address).toBe(address);
    expect(customer.name).toBe("John");
    expect(customer.email).toBe("john@example");
  });
});
