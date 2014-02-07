(function() {

function RenderingEngine(resolver) {
	this.resolver = resolver || null;
}

RenderingEngine.prototype.resolver = null;

RenderingEngine.prototype.render = function render(name, data) {
	var promise = new Bloodhound.RenderPromise(this);

	this.resolver.fetch(name, function(template) {
		promise
			.fulfill("done", template.render(data))
			.destructor();

		template = data = promise = null;
	});

	return promise;
};

Bloodhound.RenderingEngine = RenderingEngine;

})();
