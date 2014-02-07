(function() {

function SimpleTemplateProvider() {
	this.regexes = [
		Template.REGEX_FOREACH,
		Template.REGEX_RENDER,
		Template.REGEX_INCLUDE
	];
}

SimpleTemplateProvider.prototype.createTemplate = function createTemplate(name, source) {
	return new Template(name, source);
};

SimpleTemplateProvider.prototype.forEachSubTemplate = function forEachSubTemplate(source, callback, context) {
	var regexes = this.regexes,
	    i = 0,
	    length = regexes.length;

	for (i; i < length; i++) {
		source.replace(regexes[i], function(tag, templateName) {
			callback.call(context, templateName);
		});
	}

	regexes = callback = context = null;
};

Bloodhound.TemplateProviders.SimpleTemplateProvider = SimpleTemplateProvider;

})();

