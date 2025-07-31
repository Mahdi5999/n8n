const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    await page.goto('https://divar.ir/s/tehran/mobile-phones', {
      waitUntil: 'networkidle2',
    });

    const result = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('div.kt-post-card').forEach((card) => {
        const title = card.querySelector('.kt-post-card__title')?.innerText.trim() || '';
        const price = card.querySelector('.kt-post-card__description')?.innerText.trim() || '';
        const href = card.querySelector('a')?.getAttribute('href') || '';
        if (title) {
          items.push({ title, price, href });
        }
      });
      return items;
    });

    res.json(result);
    await browser.close();
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
