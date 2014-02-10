(function() {

function MustacheTemplate(name, source) {
	this.partials = [];
	this.name = name || null;

	if (source) {
		this.setSource(source);
	}
}

MustacheTemplate.viewResolver = null;

MustacheTemplate.find = function find(name) {
	if (!this.viewResolver) {
		throw new Error("No view resolver found. Set MustacheTemplate.viewResolver to fix this error.");
	}

	return this.viewResolver.find(name);
}

MustacheTemplate.prototype.getPartials = function getPartials(partials) {
	if (!this.partials.length) {
		return null;
	}

	partials = partials || {};

	var name, template, i = 0,
	    length = this.partials.length;

	for (i; i < length; i++) {
		name = this.partials[i];
		template = MustacheTemplate.find(name);
		partials[name] = template.source;
		template.getPartials(partials);
	}

	return partials;
};

MustacheTemplate.prototype.render = function render(data) {
	return Mustache.render(this.source, data, this.getPartials());
};

MustacheTemplate.prototype.setSource = function setSource(source) {
	var tokens = Mustache.parse(source),
	    i = 0,
	    length = tokens.length;

	for (i; i < length; i++) {
		if (tokens[i][0] === ">") {
			this.partials.push(tokens[i][1]);
		}
	}

	this.source = source;
};

Bloodhound.Adapters.MustacheTemplate = MustacheTemplate;

})();
