import EventDispatcher from "../../../event/@shared/event-dispatcher";
import Address from "../../entity/address";
import Customer from "../../entity/customer";
import AddressChangedEvent from "./address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/console-log-2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

const COSTUMER_CREATED_EVENT = "CustomerCreatedEvent";
const CUSTOMER_ADDRESS_CHANGED_EVENT = "AddressChangedEvent";

describe("Customer events tests", () => {
  it("should notify event by handlers 1 and 2", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register(COSTUMER_CREATED_EVENT, eventHandler1);
    eventDispatcher.register(COSTUMER_CREATED_EVENT, eventHandler2);
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    const customerCreatedEvent = new CustomerCreatedEvent(
      new Customer("12", "teste", "teste@")
    );

    expect(
      eventDispatcher.getEventHandler[COSTUMER_CREATED_EVENT][0]
    ).toMatchObject(eventHandler1);

    //executar método handler
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify event when the users address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    eventDispatcher.register(CUSTOMER_ADDRESS_CHANGED_EVENT, eventHandler);
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const customer = new Customer("2", "teste", "teste@");
    
    customer.changeAddress(new Address("rua", 1, "74444444", "cidade"));
    
    const addressChangedEvent = new AddressChangedEvent({
      eventName: CUSTOMER_ADDRESS_CHANGED_EVENT,
      customer: customer
    });

    eventDispatcher.notify(addressChangedEvent);
    
    expect(
      eventDispatcher.getEventHandler[CUSTOMER_ADDRESS_CHANGED_EVENT][0]
    ).toMatchObject(eventHandler);
    

    //executar método handler
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
