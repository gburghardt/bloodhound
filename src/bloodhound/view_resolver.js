(function() {

function ViewResolver(container, provider) {

	// Public Properties

	this.container = container || null;
	this.provider = provider || null;
	this.sourceCacheKeyPrefix = "bloodhound.templates.";
	this.templateNameAttribute = "data-template-name";
	this.templateExtension = ".tpl";
	this.templateUrlAttribute = "data-template-url";
	this.templateUrlBase = "/js/app/views";

	// Public Methods

	this.fetch = fetch;
	this.find = find;
	this.getTemplateCache = getTemplateCache;

	// Private Properties

	var _templates = {},
	    _sourceCache = window.localStorage || {},
	    _sourceNodeCache = {},
	    self = this;

	// Private Methods

	function fetch(name, callback, context) {
		if (_templates[name]) {
			callback.call(context || null, _templates[name]);
			return;
		}

		var url = getTemplateURL(name),
		    xhr = new XMLHttpRequest();

		var readyStateChanged = function readyStateChanged() {
			if (xhr.readyState !== 4) {
				return;
			}
			else if (xhr.status === 200) {
				fetchSubTemplates(xhr.responseText, function() {
					_templates[name] = self.provider.createTemplate(name, xhr.responseText);
					callback.call(context || null, _templates[name]);
					complete();
				});
			}
			else {
				complete();
				throw new Error("Request to fetch template '" + name + "' from URL '" + url + "' failed with status: " + this.status);
			}
		};

		var complete = function complete() {
			xhr.onreadystatechange = null;
			xhr = callback = context = resolver = null;
		};

		xhr.onreadystatechange = readyStateChanged;
		xhr.open("GET", url);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.send(null);
	}

	function fetchSubTemplates(source, callback) {
		var count = 0;

		var handleTemplateFetched = function(template) {
			count--;
			checkCount();
			template = null;
		};

		var checkCount = function() {
			if (!count) {
				callback.call();
				callback = handleTemplateFetched = checkCount = null;
			}
		};

		self.provider.forEachSubTemplate(source, function(name) {
			count++;
			fetch(name, handleTemplateFetched);
		});

		checkCount();
	}

	function find(name, callback, context) {
		context = context || null;

		if (_templates[name]) {
			if (callback) {
				callback.call(context, _templates[name]);
				return;
			}
			else {
				return _templates[name];
			}
		}
		else if (!callback) {
			throw new Error("Cannot find uncached template: " + name);
		}

		var node = getSourceNode(name);

		if (node && !node.getAttribute(self.templateUrlAttribute)) {
			fetchSubTemplates(node.innerHTML, function() {
				_templates[name] = self.provider.createTemplate(name, node.innerHTML);
				callback.call(context, _templates[name]);
			});
		}
		else {
			fetch(name, function(template) {
				callback.call(context, template);
			});
		}
	}

	function getSourceNode(name, container) {
		container = container || self.container;

		if (_sourceNodeCache[name]) {
			return _sourceNodeCache[name];
		}

		var scripts = container.getElementsByTagName("script"),
		    i = scripts.length;

		while (i--) {
			if (scripts[i].getAttribute(self.templateNameAttribute) === name) {
				_sourceNodeCache[name] = scripts[i];
				break;
			}
		}

		scripts = container = null;

		return _sourceNodeCache[name] || null;
	}

	function getTemplateCache() {
		return _templates;
	}

	function getTemplateURL(name) {
		var url = "",
		    node = getSourceNode(name);

		if (node) {
			url = node.getAttribute(self.templateUrlAttribute);

			if (!url) {
				throw new Error("Missing required attribute " + self.templateUrlAttribute + " on <script type='text/html' " + self.templateNameAttribute + "='" + name + "' />");
			}
		}
		else {
			url = self.templateUrlBase
			    + (/^\//.test(name) ? name : "/" + name)
			    + self.templateExtension;
		}

		return url + (/^\?/.test(url) ? "&" : "?") + "__cache__=" + ViewResolver.cacheBuster;
	}

};

ViewResolver.cacheBuster = new Date().getTime();

Bloodhound.ViewResolver = ViewResolver;

})();
