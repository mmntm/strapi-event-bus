export class BaseEvent {
    /**
     * In child classed this will represent
     * the string value of the event name
     *
     * Example CheckoutCompletedEvent class will have this field
     * set to "checkout.completed"
     * @type {string}
     */
    static eventName: string;
    /**
     * In child classed this will represent
     * the string value of the event type
     * @type {import("./Event.typings").EventType}
     */
    static eventType: import("./Event.typings").EventType;
    /**
     * An input used to create an event
     * @param {import("./Event.typings").BaseEventConstructorInput} input
     */
    constructor(input: import("./Event.typings").BaseEventConstructorInput);
    /**
     * Unique identifier of an event.
     * @type {string}
     */
    uid: string;
    /**
     * If there is a chain of events, they will share the same id.
     * Example: If order.created will trigger event handler which will call
     * a command that sends an email to store owner, which given that it succeeds
     * produces email.sent event. In this scenario all three of those events
     * would share the same traceId.
     * @type {string}
     */
    traceId: string;
    /**
     * Time at which this event has been emitted.
     * @type {number}
     */
    emitted: number;
    /**
     * Defines an event type or in other words, what
     * event does this "event" represent.
     * Example: order.cancelled
     * @type {string}
     */
    name: string;
    /**
     * Reference to a user who triggered this event.
     * If triggered from a chain, this will refer to a user
     * who triggered the event that started that chain.
     * @type {any}
     */
    userId: any;
    /**
     * Whether the event is just an event - something happened
     * or a command - do something
     * @type {EventType}
     */
    eventType: EventType;
    /**
     * An object holding all information regarding the event.
     * A "auth.user.logged-in" would have no value whatsoever without
     * the information about the user that has logged in.
     * @type {any}
     */
    payload: any;
}
