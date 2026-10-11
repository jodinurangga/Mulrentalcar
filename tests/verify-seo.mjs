
const pages = [
  '/',
  '/mobil',
  '/mobil/avanza-xenia',
  '/layanan',
  '/tentang-kami',
  '/kontak',
  '/syarat-ketentuan',
  '/kebijakan-privasi'
];

async function verify() {
  const results = [];
  for (const p of pages) {
    const res = await fetch('http://localhost:3000' + p);
    const html = await res.text();
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const jsonLdMatches = (html.match(/<script type="application\/ld\+json">/g) || []).length;
    results.push({
      path: p,
      status: res.status,
      canonical: canonicalMatch ? canonicalMatch[1] : 'NONE',
      jsonLdCount: jsonLdMatches
    });
  }
  console.table(results);

  // Print schemas for vehicle detail page
  const detailRes = await fetch('http://localhost:3000/mobil/avanza-xenia');
  const detailHtml = await detailRes.text();
  const detailSchemas = [...detailHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  console.log('\n=== JSON-LD Schemas on /mobil/avanza-xenia ===');
  detailSchemas.forEach((m, i) => {
    console.log(`\n--- Schema #${i+1} ---`);
    console.log(JSON.stringify(JSON.parse(m[1]), null, 2));
  });
}

verify().catch(console.error);
