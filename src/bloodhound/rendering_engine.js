(function() {

function RenderingEngine(viewResolver) {
	this.viewResolver = viewResolver || null;
}

RenderingEngine.prototype.viewResolver = null;

RenderingEngine.prototype.render = function render(name, data) {
	var promise = new Bloodhound.RenderPromise(this);

	this.viewResolver.find(name, function(template) {
		promise.fulfill("done", template.render(data));
		template = data = null;
	});

	return promise;
};

Bloodhound.RenderingEngine = RenderingEngine;

})();
