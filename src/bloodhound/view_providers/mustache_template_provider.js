(function() {

function MustacheViewProvider() {
	this.regex = /\{\{>\s*([-\w\/.]+)/g;
}

MustacheViewProvider.prototype.createTemplate = function createTemplate(name, source) {
	return new MustacheTemplate(name, source);
};

MustacheViewProvider.prototype.forEachSubTemplate = function forEachSubTemplate(source, callback, context) {
	source.replace(this.regex, function(tag, templateName) {
		callback.call(context, templateName);
	});
};

function MustacheTemplate(name, source) {
	this.name = name;
	this.source = source;
	Mustache.parse(source);
}

MustacheTemplate.prototype.render = function render(data) {
	return Mustache.render(this.source, data);
};

Bloodhound.ViewProviders.MustacheViewProvider = MustacheViewProvider;

})();
