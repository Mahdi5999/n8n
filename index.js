const express = require('express');
const app = express();
const scrapeDivar = require('./scraper');

app.get('/scrape', async (req, res) => {
  try {
    const result = await scrapeDivar();
    res.json(result);
  } catch (err) {
    console.error('Scrape error:', err.message);
    res.status(500).json({ error: 'Scrape failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Scraper ready on http://localhost:${PORT}/scrape`);
});
