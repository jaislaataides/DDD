import Address from "../address";
import Customer from "../customer";
import {v4 as uuid} from "uuid";

export default class CustomerFactory {
    public static create(name: string, email: string):Customer {
        return new Customer(uuid(), name, email);
    }
    public static createWithAddress(name: string, email: string, address: Address): Customer {
        const customer = CustomerFactory.create(name, email);
        customer.changeAddress(address);
        return customer;
    }
}