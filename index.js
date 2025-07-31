app.get('/scrape', async (req, res) => {
  try {
    const result = await scrapeDivar();
    res.json(result);
  } catch (err) {
    console.error('❌ Scrape failed:', err); // نمایش جزئیات خطا
    res.status(500).json({ error: err.message || 'Scrape failed' });
  }
});
