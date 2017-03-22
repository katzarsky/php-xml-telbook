// Shorthand for DELETE AJAX requests.
$.delete = function (url) {
	return $.ajax({
		url: url,
		type: 'DELETE'
	});
};

// Shorthand for POST AJAX requests with XML.
// Same as $.post but with object-to-XML conversion.
$.postXML = function (url, dom) {
	var serializer = new XMLSerializer();
	var xml_string = serializer.serializeToString(dom.documentElement);
	return $.ajax({
		url: url,
		type : 'POST',
		data : xml_string,
		contentType : 'text/xml'
	});
};

// Usage: $('form.person-edit').serializeObject();
// Goes through all fields in the form, and collects their values.
// returns object with variables and values that correspond to the form fields.
$.fn.serializeObject = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
