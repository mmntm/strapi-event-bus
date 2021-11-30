/**
 * @typedef {"event" | "command"} EventType
 */

/**
 * An input definition required to create a base event class.
 *
 * @typedef {Object} BaseEventConstructorInput
 * @property {string} [uid]
 * @property {string} [traceId]
 * @property {string} name
 * @property {string|number} [userId]
 * @property {EventType} [eventType]
 * @property {object} payload
 */

/**
 * An input definition for creating events
 * derived from the base class. Where by design
 * the constructors of these specialized class events
 * should defined fields such as type and eventType.
 *
 * @typedef {Object} BasicEventConstructorInput
 * @property {string} [traceId]
 * @property {string|number} [userId]
 */
