# php-xml-telbook

A simple `telephone book` web-application, using REST PHP backend and XML transport.

## Utilizes:

	.htaccess (to implement URL rewriting for the server backend)

	HTML/CSS (browser visualization)
	AJAX/XML (transport of data between server and browser)
	JQuery.js Library: https://api.jquery.com/

	PHP: http://php.net/manual/en/

	MySQL database (with 3 tables: persons, telephones, teltypes)


## Backend URLs:
				
	* [GET] persons
	* [GET, POST, DELETE] persons/{ID}
	* [GET] persons/{ID}/telephones
	* [GET] telephones
	* [GET, POST, DELETE] telephones/{ID}
	* [GET] teltypes

## XML entities:

	*person*:
		<person>
			<id>1</id>
			<fname>Ivan</fname>
			<lname>Ivanov</lname>
			<address>Dragan Tsankov 47</address>
		</person>

	*teltype*: 
		<teltype>
			<id>2</id>
			<name>Mobile</name>
		</teltype>

	*telephone*:
		<telephone>
			<id>1</id>
			<person_id>1</person_id>
			<teltype_id>2</teltype_id>
			<number>0883199482</number>
		</telephone>

	*message*: 
		<message>
			<type>error</type>
			<text>An error has ocurred!</text>
		</message>

	*server-response*: 
		<response>
			<code></code>
			<messages>...</messages>
			... (<persons>, <telephones>, ...)
		</response>
