const fs = require('fs');

async function translateArray(texts, tl) {
  const results = [];
  for (let i = 0; i < texts.length; i += 10) {
    const chunk = texts.slice(i, i + 10);
    const q = chunk.join('\n\n_XX_\n\n');
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const translatedStr = data[0].map(x => x[0]).join('');
      const splits = translatedStr.split(/_XX_|X_X|_X_X_|_X X_/i).map(s => s.trim().replace(/^_+|_+$/g, ''));
      results.push(...splits);
    } catch (e) {
      console.log('Error', e);
      results.push(...chunk); // fallback
    }
  }
  return results;
}

const mockDataRaw = fs.readFileSync('./data/mockData.ts', 'utf-8');
// This is hard to parse correctly with regex, we should just run a dynamic translation inside the app.
