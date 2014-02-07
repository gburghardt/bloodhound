var Bloodhound = {
	TemplateProviders: {
		ITemplateProvider: {
			createTemplate: function createTemplate(name, source) {
				throw new Error("Bloodhound.ITemplateProvider is an interface");
			},
			forEachSubTemplate: function forEachSubTemplate(source, callback, context) {
				throw new Error("Bloodhound.ITemplateProvider is an interface");
			}
		}
	},

	ITemplate: {
		render: function render(data) {
			throw new Error("Bloodhound.ITemplate is an interface");
		}
	},

	RenderPromise: Promise.create(["done"])
};