<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" />
	
	<xsl:template match="/">
		<xsl:apply-templates select='//person' />
	</xsl:template>
	
	<xsl:template match="person">
		<h1>
			<xsl:choose>
				<xsl:when test="id = ''">Add Person</xsl:when>
				<xsl:otherwise>Edit Person</xsl:otherwise>
			</xsl:choose>
		</h1>
		<form>
			<p>
				<label>ID</label>
				<input name='id' readonly='readonly'>
					<xsl:attribute name='value'><xsl:value-of select='id' /></xsl:attribute>
				</input>
			</p>
			<p>
				<label>First Name</label>
				<input name='fname'>
					<xsl:attribute name='value'><xsl:value-of select='fname' /></xsl:attribute>
				</input>
			</p>
			<p>
				<label>Last Name</label>
				<input name='lname'>
					<xsl:attribute name='value'><xsl:value-of select='lname' /></xsl:attribute>
				</input>
			</p>
			<p>
				<label>Address</label>
				<input name='address'>
					<xsl:attribute name='value'><xsl:value-of select='address' /></xsl:attribute>
				</input>
			</p>
			<p>
				<button>Save</button>
			</p>
		</form>
	</xsl:template>	
	
</xsl:stylesheet>