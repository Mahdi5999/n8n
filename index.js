const express = require('express');
const scrapeDivar = require('./scraper');

const app = express(); // ✅ این خط رو نذاشته بودی!

app.get('/scrape', async (req, res) => {
  try {
    const result = await scrapeDivar();
    res.json(result);
  } catch (err) {
    console.error('❌ Scrape failed:', err);
    res.status(500).json({ error: err.message || 'Scrape failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Scraper running at http://localhost:${PORT}/scrape`);
});
