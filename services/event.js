module.exports = {
	async create(data) {
		const { pluginName, model } = this.extractMeta(strapi.plugins);
		const ORMModel = strapi.query(model.modelName, pluginName).model;

		const newCustomEntry = await ORMModel.forge(data).save();

		// trigger manually
		ORMModel.lifecycles.afterCreate(newCustomEntry.toJSON());
	},

	extractMeta: plugins => {
		const { ['strapi-event-bus']: plugin } = plugins;
		const { ['event']: service } = plugin.services;
		const { ['event']: model } = plugin.models;
		return {
			model,
			service,
			plugin,
			pluginName: plugin.package.strapi.name.toLowerCase()
		};
	},
};
