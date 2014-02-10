(function() {

function EmbeddedRenderingEngine(viewResolver) {
	if (viewResolver) {
		this.setViewResolver(viewResolver);
	}
}

EmbeddedRenderingEngine.prototype.render = function render(name, data, elementOrId) {
	var template = this.viewResolver.find(name),
	    result = "",
	    element = null;

	if (!template) {
		throw new Error("Could not find template named: " + name);
	}

	result = template.render(data);

	if (elementOrId) {
		element = typeof elementOrId === "string"
		        ? document.getElementById(elementOrId)
		        : elementOrId;

		if (!element) {
			throw new Error("Cannot find element: " + elementOrId);
		}

		element.innerHTML = result;
	}

	element = template = data = elementOrId = null;

	return result;
};

EmbeddedRenderingEngine.prototype.setViewResolver = function setViewResolver(viewResolver) {
	this.viewResolver = viewResolver;
};

Bloodhound.RenderingEngines.EmbeddedRenderingEngine = EmbeddedRenderingEngine;

})();
