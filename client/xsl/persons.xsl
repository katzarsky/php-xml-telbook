<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" />
		
	<xsl:template match="/">
		<table class="grid">
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Address</th>
				<th></th>
			</tr>
			<xsl:apply-templates select="//persons/item" />
		</table>
	</xsl:template>
	
	<xsl:template match="persons/item">
		<tr>
			<td><xsl:value-of select='id' /></td>
			<td>
				<a href='#' class='user_icon person-telephones'>
					<xsl:attribute name="data-person-id"><xsl:value-of select="id" /></xsl:attribute>
					<xsl:value-of select='fname' />
					<xsl:text> </xsl:text>
					<xsl:value-of select='lname' />
				</a>
			</td>
			<td><xsl:value-of select='address' /></td>
			<td>
				<a href='#' class='edit_icon person-edit'>
					<xsl:attribute name="data-person-id"><xsl:value-of select="id" /></xsl:attribute>
					Edit
				</a>
				<a href='#' class='delete_icon person-delete'>
					<xsl:attribute name="data-person-id"><xsl:value-of select="id" /></xsl:attribute>
					Delete
				</a>
			</td>
		</tr>
	</xsl:template>
	
</xsl:stylesheet>