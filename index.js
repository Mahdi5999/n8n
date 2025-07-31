const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/scrape', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://divar.ir/s/tehran/mobile-phones', { waitUntil: 'networkidle2' });
  await page.waitForTimeout(3000); // صبر برای بارگذاری کامل

  const result = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('div.kt-post-card').forEach(card => {
      const title = card.querySelector('.kt-post-card__title')?.innerText.trim() || '';
      const price = card.querySelector('.kt-post-card__description')?.innerText.trim() || '';
      const href = card.querySelector('a')?.getAttribute('href') || '';
      if (title) {
        items.push({
          title,
          price,
          link: 'https://divar.ir' + href
        });
      }
    });
    return items;
  });

  await browser.close();
  res.json(result);
});

app.listen(3000, () => {
  console.log('✅ Scraper آماده است: http://localhost:3000/scrape');
});
