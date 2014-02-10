(function() {

function MustacheTemplate(name, source) {
	this.partials = [];
	this.name = name || null;

	if (source) {
		this.setSource(source);
	}
}

MustacheTemplate.prototype.viewResolver = null;

MustacheTemplate.prototype.getPartials = function getPartials(partials) {
	if (!this.partials.length) {
		return null;
	}

	partials = partials || {};

	var name, template, i = 0,
	    length = this.partials.length;

	for (i; i < length; i++) {
		name = this.partials[i];
		template = this.viewResolver.find(name);
		partials[name] = template.source;
		template.getPartials(partials);
	}

	return partials;
};

MustacheTemplate.prototype.render = function render(data) {
	return Mustache.render(this.source, data, this.getPartials());
};

MustacheTemplate.prototype.setSource = function setSource(source) {
	var partials = this.partials;

	this.source = source;

	source.replace(/\{\{>\s*([-\w.\/]+)\s*\}\}/g, function(tag, partial) {
		partials.push(partial);
	});
};

Bloodhound.Adapters.MustacheTemplate = MustacheTemplate;

})();
