import Address from "./domain/product copy/entity/address";
import Customer from "./domain/product copy/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order-item";

let customer = new Customer("1", "John Doe", "john.doe@example.com");

const address = new Address("Street", 123, "1234567890", "City");
customer.Address(address);
customer.activate();

const item1 = new OrderItem("1", "Product 1", "Item 1", 100, 2);
const item2 = new OrderItem("2", "Product 2", "Item 2", 200, 1);

const order = new Order("1", "1", [item1, item2]);
