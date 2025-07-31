const puppeteer = require('puppeteer');

module.exports = async function scrapeDivar() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/opt/render/.cache/puppeteer/chrome/linux-127.0.6533.88/chrome-linux64/chrome'
  });

  const page = await browser.newPage();
  await page.goto('https://divar.ir/s/tehran/mobile-phones', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  await page.waitForSelector('.kt-post-card__title', { timeout: 15000 });

  const data = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('div.kt-post-card__body').forEach(card => {
      const titleEl = card.querySelector('.kt-post-card__title');
      const priceEl = card.querySelector('.kt-post-card__description');
      const locationEl = card.querySelector('.kt-post-card__bottom-description.kt-text-truncate span');

      results.push({
        title: titleEl?.innerText.trim() || null,
        price: priceEl?.innerText.trim() || null,
        location: locationEl?.innerText.trim() || null,
      });
    });
    return results;
  });

  await browser.close();
  return data;
};
