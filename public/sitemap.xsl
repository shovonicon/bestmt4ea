<?xml version="1.0" encoding="UTF-8"?>
<!--
  Renders the XML sitemap as a readable page when a human opens it in a browser.
  Search engines ignore this stylesheet and read the XML directly.
-->
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  exclude-result-prefixes="sm image"
>
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <title>BESTMT4EA sitemap</title>
        <style>
          :root { color-scheme: dark; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 3rem 1.25rem;
            background: #000;
            color: #e7eef2;
            font: 15px/1.7 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .wrap { max-width: 60rem; margin: 0 auto; }
          h1 { font-size: 1.6rem; letter-spacing: -0.02em; margin: 0; }
          .lead { color: #8aa0ad; margin: 0.5rem 0 2rem; }
          a { color: #00c190; text-decoration: none; }
          a:hover { text-decoration: underline; }
          h2 { font-size: 1.05rem; margin: 2rem 0 0.75rem; }
          ul { list-style: none; padding: 0; margin: 0; }
          li { padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
          em { color: #8aa0ad; font-style: normal; font-size: 0.85em; }
          table { width: 100%; border-collapse: collapse; }
          th, td { text-align: left; padding: 0.55rem 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.06); vertical-align: top; }
          th { color: #8aa0ad; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; }
          td:first-child { word-break: break-word; }
          .mod { color: #8aa0ad; font-size: 0.85rem; white-space: nowrap; }
          .img { color: #6b8494; font-size: 0.75rem; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>BESTMT4EA sitemap</h1>
          <p class="lead">
            This is the XML sitemap for
            <a href="https://bestmt4ea.com/">bestmt4ea.com</a>. It is meant for search
            engines and answer engines; the links below are the public pages.
          </p>
          <xsl:apply-templates select="sm:sitemapindex | sm:urlset" />
        </div>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="sm:sitemapindex">
    <h2>Sitemaps</h2>
    <ul>
      <xsl:for-each select="sm:sitemap">
        <li>
          <a href="{sm:loc}"><xsl:value-of select="sm:loc" /></a>
          <xsl:if test="sm:lastmod">
            <em> — <xsl:value-of select="sm:lastmod" /></em>
          </xsl:if>
        </li>
      </xsl:for-each>
    </ul>
  </xsl:template>

  <xsl:template match="sm:urlset">
    <h2>
      Pages
      <em> — <xsl:value-of select="count(sm:url)" /> URLs</em>
    </h2>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Last modified</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sm:url">
          <tr>
            <td>
              <a href="{sm:loc}"><xsl:value-of select="sm:loc" /></a>
              <xsl:if test="image:image">
                <div class="img">
                  <xsl:value-of select="count(image:image)" /> image(s)
                </div>
              </xsl:if>
            </td>
            <td class="mod"><xsl:value-of select="sm:lastmod" /></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>
