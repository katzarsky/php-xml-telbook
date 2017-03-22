//var XML_TELTYPES = null;var XSL_PERSONS = null;var XSL_PERSON_FORM = null;var XSL_MESSAGES = null;var XSL_TELEPHONES = null;function reload_persons() {	$.get('persons').done(function(xml) {		$('#persons').html(xsl_transform(xml, XSL_PERSONS));		$('#persons-messages').html(xsl_transform(xml, XSL_MESSAGES));	});}function reload_telephones(person_id) {	$.get('persons/' + person_id + '/telephones').done(function(xml) {		$('#telephones').html(xsl_transform(xml, XSL_TELEPHONES));		$('#telephones-messages').html(xsl_transform(xml, XSL_MESSAGES));	}).fail(function(response) {		var xml = response.responseXML;		$('#telephones-messages').html(xsl_transform(xml, XSL_MESSAGES));	});}$(document).ready(function() {		$.get('client/xsl/messages.xsl').done(function(data) { XSL_MESSAGES = data; });	$.get('client/xsl/persons.xsl').done(function(data) { XSL_PERSONS = data; });	$.get('client/xsl/person-form.xsl').done(function(data) { XSL_PERSON_FORM = data; });	$.get('client/xsl/telephones.xsl').done(function(data) { XSL_TELEPHONES = data; });	$.get('client/xsl/telephone-form.xsl').done(function(data) { XSL_TELEPHONE_FORM = data; });	reload_persons();		$(document).on('click', 'a.persons-refresh', function() {		reload_persons();		return false; 	});		$(document).on('click', 'a.person-add', function() {		var xml = "<data><person><id/><fname/><lname/><address/></person></data>";		$('#person-edit').html(xsl_transform(xml_init(xml), XSL_PERSON_FORM));		$('#person-messages').html('');		return false;	});		$(document).on('click', 'a.person-edit', function() {		var person_id = $(this).attr('data-person-id');		$.get('persons/'+person_id).done(function(xml) {			$('#person-edit').html(xsl_transform(xml, XSL_PERSON_FORM));			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));		}).fail(function(response) {			var xml = response.responseXML;			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));		});		return false;	});		$(document).on('submit', '#person-edit > form', function() {		var edited_person = $(this).serializeObject();		var dom = xml_init_object('person', edited_person);		$.postXML('persons/' + edited_person.id, xml_serialize(dom)).done(function(xml) {			$('#person-edit').html('');			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));			reload_persons();		}).fail(function(response) {			var xml = response.responseXML;			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));		});		return false;	});		$(document).on('click', 'a.person-delete', function() {		var person_id = $(this).attr('data-person-id');		$.delete('persons/' + person_id).done(function(xml) {			reload_persons();			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));		}).fail(function(response) {			var xml = response.responseXML;			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));		});		return false;	});	$(document).on('click', 'a.person-telephones, a.telephones-refresh', function() {		var person_id = $(this).attr('data-person-id');		reload_telephones(person_id);		return false;	});		$(document).on('click', 'a.telephone-delete', function() {		var telephone_id = $(this).attr('data-telephone-id');		var person_id = $(this).attr('data-person-id');		$.delete('telephones/' + telephone_id).done(function() {			reload_telephones(person_id);		});		return false;	});});function xsl_transform(xml, xsl) {	var xsltProcessor = new XSLTProcessor();	xsltProcessor.importStylesheet(xsl);	return xsltProcessor.transformToFragment(xml, document);}function xml_init(xml_string) {	var parser = new DOMParser();	var xml_dom = parser.parseFromString(xml_string, "text/xml"); //important to use "text/xml"	return xml_dom;}function xml_init_object(name, obj) {	var parser = new DOMParser();	var dom = parser.parseFromString("<data><"+name+"></"+name+"></data>", "text/xml"); //important to use "text/xml"	var root = dom.getElementsByTagName(name);	for(var k in obj) {        var knode = dom.createElement(k);        var txt = dom.createTextNode(obj[k]);        knode.appendChild(txt);        root[0].appendChild(knode);	}	return dom;}function xml_serialize(dom) {	var serializer = new XMLSerializer();	return serializer.serializeToString(dom.documentElement);}