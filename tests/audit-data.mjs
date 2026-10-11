import { readFileSync } from 'fs';

async function audit() {
  // 1. Fetch live sitemap.xml
  const sitemapRes = await fetch('http://localhost:3000/sitemap.xml');
  const sitemapText = await sitemapRes.text();
  const urlsInSitemap = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

  console.log('=== SITEMAP URL AUDIT ===');
  console.log('Sitemap HTTP status:', sitemapRes.status);
  console.log('Total URLs found in <loc> tags:', urlsInSitemap.length);
  console.log('URLs:');
  urlsInSitemap.forEach((u, i) => console.log(`  ${i+1}. ${u}`));

  // Check unique
  const uniqueUrls = new Set(urlsInSitemap);
  console.log('Unique URLs count:', uniqueUrls.size);
  console.log('All URLs start with https://mulrentcar.com:', urlsInSitemap.every(u => u.startsWith('https://mulrentcar.com')));

  // 2. Fetch live robots.txt
  const robotsRes = await fetch('http://localhost:3000/robots.txt');
  const robotsText = await robotsRes.text();
  console.log('\n=== ROBOTS.TXT AUDIT ===');
  console.log('Robots HTTP status:', robotsRes.status);
  console.log(robotsText);

  // 3. Check each URL in sitemap for status and canonical
  console.log('\n=== CANONICAL & ROBOTS TAG AUDIT PER URL ===');
  const urlAudits = [];
  for (const url of urlsInSitemap) {
    const path = url.replace('https://mulrentcar.com', '') || '/';
    const res = await fetch('http://localhost:3000' + path);
    const html = await res.text();
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const robotsMeta = html.match(/<meta name="robots" content="([^"]+)"/);
    const hasNoindex = html.toLowerCase().includes('noindex');

    urlAudits.push({
      path,
      status: res.status,
      canonical: canonicalMatch ? canonicalMatch[1] : 'NONE',
      canonicalMatches: canonicalMatch ? canonicalMatch[1] === url : false,
      robotsMeta: robotsMeta ? robotsMeta[1] : 'NONE',
      hasNoindex
    });
  }
  console.table(urlAudits);
}

audit().catch(console.error);
