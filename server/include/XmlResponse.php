<?php

class XmlResponse {	
	public $code = null; // 200 by default for HTTP protocol
	public $messages = [];
	
	public function error($text) {		
		$this->messages[] = (object) ['type' => 'error', 'text' => $text];
	}

	public function info($text) {
		$this->messages[] = (object) ['type' => 'info', 'text' => $text];
	}
	
	public function code($http_code) {
		$this->code = $http_code;
	}
	
	public function hasErrors() {
		$errors = 0;
		foreach($this->messages as $m) {
			if($m->type == 'error') {
				$errors++;
			}
		}
		return ($errors > 0);
	}
	
	public function render() {
		header("Content-Type: text/xml; charset=utf-8");
		if($this->code === null) {
			$this->code = 200;
		}
		else {
			http_response_code($this->code);
		}
		
		$xml =
			'<?xml version="1.0" encoding="UTF-8"?>'."\n".
			$this->xml_encode('data', $this);

		// nice formatting
		$domxml = new DOMDocument('1.0');
		$domxml->preserveWhiteSpace = false;
		$domxml->formatOutput = true;
		$domxml->loadXML($xml);
		return $domxml->saveXML();
	}
	
	private function xml_encode($name, $var) {
		$xml = "<$name>";
		if(is_object($var) || (is_array($var) && $this->is_assoc($var))) {
			foreach($var as $k => $v){
				$xml .= "\n".$this->xml_encode($k, $v);
			}
		}
		else if(is_array($var)) {
			foreach($var as $v){
				$xml .= "\n".$this->xml_encode('item', $v);
			}
		}
		else {
			$xml .= $this->xml_escape($var);
		}
		$xml .= "</$name>";
		return $xml;
	}
	
	private function is_assoc($arr) {
		if ([] === $arr) return false;
		return array_keys($arr) !== range(0, count($arr) - 1);
	}
	
	private function xml_escape($val) {
		return htmlspecialchars($val, ENT_QUOTES);
	}
}