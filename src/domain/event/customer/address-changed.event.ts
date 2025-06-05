import EventInterface from "../../../event/@shared/event.interface";
import Customer from "../../entity/customer";

export default class AddressChangedEvent implements EventInterface { 
    dataTimeOcurred: Date;
    eventData: {
        eventName: string,
        customer: Customer
    };

    constructor(eventData: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = eventData;
    }    
}