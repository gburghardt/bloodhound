(function() {

function MustacheViewProvider() {
	this.regex = /\{\{>\s*([-\w\/.]+)/g;
}

MustacheViewProvider.prototype.createTemplate = function createTemplate(name, source) {
	return new Bloodhound.Adapters.MustacheTemplate(name, source);
};

MustacheViewProvider.prototype.forEachSubTemplate = function forEachSubTemplate(source, callback, context) {
	source.replace(this.regex, function(tag, templateName) {
		callback.call(context, templateName);
	});
};

Bloodhound.ViewProviders.MustacheViewProvider = MustacheViewProvider;

})();
