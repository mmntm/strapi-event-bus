export type EventType = "event" | "command";
/**
 * An input definition required to create a base event class.
 */
export type BaseEventConstructorInput = {
    traceId?: string;
    name: string;
    userId?: string | number;
    eventType?: EventType;
    payload: object;
};
/**
 * An input definition for creating events
 * derived from the base class. Where by design
 * the constructors of these specialized class events
 * should defined fields such as type and eventType.
 */
export type BasicEventConstructorInput = {
    traceId?: string;
    userId?: string | number;
};
