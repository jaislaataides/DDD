import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface{
    notify(event: EventInterface): void;
    register(event: string, eventHandler: EventHandlerInterface): void;
    unregister(event: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
}