<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" />

	<xsl:template match="/">
		<xsl:apply-templates select="//person" />
		<table class="grid">
			<tr>
				<th>ID</th>
				<th>Number</th>
				<th>Type</th>
				<th></th>
			</tr>
			<xsl:apply-templates select="//telephones/item" />
		</table>
		<p>
			<a href='#' class='add_icon telephone-add'>
				<xsl:attribute name="data-person-id"><xsl:value-of select="//person/id" /></xsl:attribute>
				Add new telephone
			</a>
			<a href='#' class='refresh_icon telephones-refresh'>
				<xsl:attribute name="data-person-id"><xsl:value-of select="//person/id" /></xsl:attribute>
				Refresh Telephones
			</a>
		</p>	
	</xsl:template>
			
	<xsl:template match="telephones/item">
		<tr>
			<td><xsl:value-of select='id' /></td>
			<td><xsl:value-of select='number' /></td>
			<td><xsl:value-of select='teltype' /></td>
			<td>
				<a href='#' class='edit_icon telephone-edit'>
					<xsl:attribute name="data-telephone-id"><xsl:value-of select="id" /></xsl:attribute>
					<xsl:attribute name="data-person-id"><xsl:value-of select="//person/id" /></xsl:attribute>
					Edit
				</a>
				<a href='#' class='delete_icon telephone-delete'>
					<xsl:attribute name="data-telephone-id"><xsl:value-of select="id" /></xsl:attribute>
					<xsl:attribute name="data-person-id"><xsl:value-of select="//person/id" /></xsl:attribute>
					Delete
				</a>
			</td>
		</tr>
	</xsl:template>
		
	<xsl:template match="person">
		<p class='user_icon'>
			<b>
				<xsl:value-of select='fname' />
				<xsl:text> </xsl:text>
				<xsl:value-of select='lname' />
			</b>,
			<xsl:value-of select='address' />
		</p>
	</xsl:template>
	
</xsl:stylesheet>
