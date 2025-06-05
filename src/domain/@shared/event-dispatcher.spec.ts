import sendEmailWhenProductIsCreatedHandler from "../../product/event/product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product/product-created.event";
import EventDispatcher from "./event-dispatcher";

const PRODUCT_CREATED_EVENT = "ProductCreatedEvent";

describe("Domain event tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);

    expect(eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT]).toBeDefined();
    expect(eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT].length).toBe(1);
    expect(
      eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);

    expect(
      eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister(PRODUCT_CREATED_EVENT, eventHandler);

    expect(eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT]).toBeDefined();
    expect(eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT].length).toBe(0);
  });


  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);

    expect(
      eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT]).toBe(undefined);
  });

  it("should notify event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new sendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register(PRODUCT_CREATED_EVENT, eventHandler);
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const productCreatedEvent = new ProductCreatedEvent({
        name: "Product 1",
        description: "Product 1 description",
        price: 10.0,
    });

    expect(
        eventDispatcher.getEventHandler[PRODUCT_CREATED_EVENT][0]
      ).toMatchObject(eventHandler);

    //executar método handler
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  })

});
