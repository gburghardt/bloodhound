(function() {

var _viewResolver = null,
    _renderingEngine = null;

var Bloodhound = {

	Adapters: {},

	ViewProviders: {
		IViewProvider: {
			createTemplate: function createTemplate(name, source) {
				throw new Error("Bloodhound.IViewProvider is an interface");
			},
			forEachSubTemplate: function forEachSubTemplate(source, callback, context) {
				throw new Error("Bloodhound.IViewProvider is an interface");
			}
		}
	},

	ITemplate: {
		render: function render(data) {
			throw new Error("Bloodhound.ITemplate is an interface");
		},
		setSource: function setSource(source) {
			throw new Error("Bloodhound.ITemplate is an interface");
		},
		setViewResolver: function setViewResolver(viewResolver) {
			throw new Error("Bloodhound.ITemplate is an interface");
		}
	},

	RenderPromise: Promise.create(["done"]),

	getRenderingEngine: function getRenderingEngine() {
		return _renderingEngine || (_renderingEngine = new Bloodhound.RenderingEngine(this.getViewResolver()));
	},

	getViewResolver: function getViewResolver() {
		if (!_viewResolver) {
			throw new Error("No view resolver found. Call Bloodhound.setViewResolver(viewResolver) to fix this error.");
		}

		return _viewResolver;
	},

	render: function render(view, data, elementOrId) {
		return this.getRenderingEngine().render(view, data, elementOrId);
	},

	setRenderingEngine: function setRenderingEngine(renderingEngine) {
		_renderingEngine = renderingEngine;
		renderingEngine = null;
	},

	setViewResolver: function setViewResolver(viewResolver) {
		_viewResolver = viewResolver;
		viewResolver = null;
	}

};

window.Bloodhound = Bloodhound;

})();
