//var XML_TELTYPES = null;var XSL_PERSONS = null;var XSL_MESSAGES = null;var XSL_TELEPHONES = null;function reload_persons() {	$.get('persons').done(function(xml) {		$('#persons').html(xsl_transform(xml, XSL_PERSONS));		$('#persons-messages').html(xsl_transform(xml, XSL_MESSAGES));	});}function reload_telephones(person_id) {	$.get('persons/' + person_id + '/telephones').done(function(xml) {		$('#telephones').html(xsl_transform(xml, XSL_TELEPHONES));		$('#telephones-messages').html(xsl_transform(xml, XSL_MESSAGES));	}).fail(function(response) {		var xml = response.responseXML;		$('#telephones-messages').html(xsl_transform(xml, XSL_MESSAGES));	});}$(document).ready(function() {		$.get('client/xsl/messages.xsl').done(function(data) { XSL_MESSAGES = data; });	$.get('client/xsl/persons.xsl').done(function(data) { XSL_PERSONS = data; });	$.get('client/xsl/telephones.xsl').done(function(data) { XSL_TELEPHONES = data; });	reload_persons();		$(document).on('click', 'a.persons-refresh', function() {		reload_persons();		return false; 	});		$(document).on('click', 'a.person-delete', function() {		var person_id = $(this).attr('data-person-id');		$.delete('persons/' + person_id).done(function(xml) {			reload_persons();			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));		}).fail(function(response) {			var xml = response.responseXML;			$('#person-messages').html(xsl_transform(xml, XSL_MESSAGES));		});		return false;	});	$(document).on('click', 'a.person-telephones, a.telephones-refresh', function() {		var person_id = $(this).attr('data-person-id');		reload_telephones(person_id);		return false;	});		$(document).on('click', 'a.telephone-delete', function() {		var telephone_id = $(this).attr('data-telephone-id');		var person_id = $(this).attr('data-person-id');		$.delete('telephones/' + telephone_id).done(function() {			reload_telephones(person_id);		});		return false;	});});function xsl_transform(xml, xsl) {	var xsltProcessor = new XSLTProcessor();    xsltProcessor.importStylesheet(xsl);    return xsltProcessor.transformToFragment(xml, document);}