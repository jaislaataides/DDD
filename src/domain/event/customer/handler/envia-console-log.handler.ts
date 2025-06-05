import EventHandlerInterface from "../../../../event/@shared/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        const customer = event.eventData.customer;
        console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.address.toString()}`);
    }
}