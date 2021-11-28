module.exports = {
	async create(data) {
		const { pluginName, model } = this.extractMeta(strapi.plugins);
		const ORMModel = strapi.query(model.modelName, pluginName).model;

		const newCustomEntry = await ORMModel.forge(data).save();

		// trigger manually
		ORMModel.lifecycles.afterCreate(newCustomEntry.toJSON());
	},

	extractMeta: plugins => {
		const { ['event-bus']: plugin } = plugins;
		const { ['busevent']: service } = plugin.services;
		const { ['busevent']: model } = plugin.models;

		return {
			model,
			service,
			plugin,
			pluginName: plugin.package.strapi.name.toLowerCase()
		};
	},
};
