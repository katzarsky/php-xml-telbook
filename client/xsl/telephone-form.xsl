<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" />
	
	<xsl:template match="/">
		<xsl:apply-templates select='//telephone' />
	</xsl:template>
	
	<xsl:template match="telephone">
		<h1>
			<xsl:choose>
				<xsl:when test="id = ''">Add Telephone</xsl:when>
				<xsl:otherwise>Edit Telephone</xsl:otherwise>
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
				<label>PERSON_ID</label>
				<input name='person_id' readonly='readonly'>
					<xsl:attribute name='value'><xsl:value-of select='person_id' /></xsl:attribute>
				</input>
			</p>
			<p>
				<label>Number</label>
				<input name='number'>
					<xsl:attribute name='value'><xsl:value-of select='number' /></xsl:attribute>
				</input>
			</p>
			<p>
				<label>Type</label>
				<select name='teltype_id'>
					<option value=''> </option>
					<xsl:for-each select='//teltypes/item'>
						<option>
							<xsl:attribute name='value'><xsl:value-of select='id' /></xsl:attribute>
							<xsl:value-of select='name'/>
						</option>
					</xsl:for-each>
				</select>
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