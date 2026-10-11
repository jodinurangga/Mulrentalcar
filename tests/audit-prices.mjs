async function auditPrices() {
  console.log('=== VEHICLE PRICE COMPARISON: UI vs SCHEMA ===');

  const sitemapRes = await fetch('http://localhost:3000/sitemap.xml');
  const sitemapText = await sitemapRes.text();
  const vehicleUrls = [...sitemapText.matchAll(/<loc>(https:\/\/mulrentcar\.com\/mobil\/[^<]+)<\/loc>/g)].map(m => m[1]);

  const results = [];

  for (const url of vehicleUrls) {
    const slug = url.replace('https://mulrentcar.com/mobil/', '');
    const res = await fetch(`http://localhost:3000/mobil/${slug}`);
    const html = await res.text();

    // Extract JSON-LD product offer price
    const schemaMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    let schemaPrice = null;
    let schemaCurrency = null;
    if (schemaMatch) {
      for (const sm of schemaMatch) {
        const jsonStr = sm.replace(/<\/?script[^>]*>/g, '');
        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed['@type'] === 'Product' && parsed.offers) {
            schemaPrice = parsed.offers.price;
            schemaCurrency = parsed.offers.priceCurrency;
          }
        } catch (e) {}
      }
    }

    // Check UI price rendering in the HTML
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const vehicleTitle = titleMatch ? titleMatch[1].trim() : slug;
    
    // UI price box has <span class="font-editorial text-3xl sm:text-4xl font-bold text-[#20252B] tracking-tight">Rp...</span>
    const uiPriceMatch = html.match(/<span class="font-editorial text-3xl sm:text-4xl font-bold text-\[#20252B\] tracking-tight">([^<]+)<\/span>/);
    const uiPriceText = uiPriceMatch ? uiPriceMatch[1].trim() : 'NONE';
    const uiNumber = uiPriceText.startsWith('Rp') ? parseInt(uiPriceText.replace(/[^0-9]/g, ''), 10) : null;

    results.push({
      slug,
      vehicleTitle,
      uiPriceText,
      schemaPrice,
      schemaCurrency,
      isPriceEqual: schemaPrice === uiNumber,
      hasWithDriverContext: html.includes('Termasuk Sopir') && html.includes('Area Medan &amp; Sekitarnya'),
    });
  }

  console.table(results);
}

auditPrices().catch(console.error);
