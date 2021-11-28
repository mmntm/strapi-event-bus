const { v4: uuid } = require('uuid');
const { BaseEvent } = require('../../lib/models/Event.model');

module.exports = async () => {
	const eventBus = require('js-event-bus')();
	const mountName = strapi.plugins['event-bus']?.config?.mountName || "bus"

	strapi.jsEventBus = eventBus

	/**
	 * Create a bus that works with promisees and more importantly whole chain wont fail if the event handler fails
	 */
	strapi[mountName] = {
		/**
		 * @param {BaseEvent} event 
		 * @returns 
		 */
		emit: (event) => new Promise(async (resolve, reject) => {
			try {
				await strapi.jsEventBus.emit(event.name, null, event)
				resolve()
			} catch (e) {
				reject(e)
			}
		})
	}

	/**
	 * Register a listener that will save every event
	 */
	eventBus.on("**", async (event) => {
		await strapi.plugins['event-bus'].services['bus-event'].create(event);
	})

	// Find the handler registrations for each model and 
	// call their respective registration hooks 
	const strapiApiModelNames = Object.keys(strapi.services)
	for (const modelName of strapiApiModelNames) {
		try {
			const handlerRegistration = await import(`../../../../api/${modelName}/event/handlers.js`)
			if (handlerRegistration) {
				handlerRegistration.default(eventBus)
			}
		} catch (e) {
		}
	}

	strapi.log.info("Strapi event bus succesfully loaded")
}