<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	
	<xsl:output method="html" />
	
	<xsl:template match="/">
		<xsl:apply-templates select='data/messages/item' />
	</xsl:template>
			
	<xsl:template match="messages/item">
		<p>
			<xsl:attribute name="class">
				<xsl:choose>
					<xsl:when test="type = 'error'">
						error_icon
					</xsl:when>
					<xsl:otherwise>
						info_icon
					</xsl:otherwise>
				</xsl:choose>
			</xsl:attribute>
			<xsl:value-of select="text" />
		</p>
	</xsl:template>
	
</xsl:stylesheet>
