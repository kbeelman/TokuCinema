const puppeteer = require('puppeteer');
const fse = require('fs-extra');

const config = {
  // baseUrl: 'http://localhost:4200',
  baseUrl: 'https://dev.tokucinema.com',
  outputPathRoot: 'dist/pre-render',
  blockedResourceTypes: [
    'image', 'media', 'font'
  ],
  skippedResources: [
    'google', 'paypal', 'gstatic'
  ]
};

function requestIsMediaOrBlockedResource(pageRequest, url) {
  return config.blockedResourceTypes.indexOf(pageRequest.resourceType()) !== -1 ||
    config.skippedResources.some(resource => url.indexOf(resource) !== -1);
}

async function getLinksOnPage(page) {
  await page.waitForSelector('a');

  const links = await page.evaluate(() => {
    const pathNames = [];
    const linksElements = document.querySelectorAll('a');

    linksElements.forEach(element => {
      if (element.href.indexOf(document.location.href) >= 0) {
        pathNames.push(element.pathname);
      }
    });

    return pathNames;
  });

  return links;
}

async function crawlPage(page, route) {
  const pageName = route === '' ? 'index' : route;
  // eslint-disable-next-line no-console
  console.log(`| ========= Attempting to crawl: ${pageName} ========= |`);

  await page.goto(`${config.baseUrl}${route}`, { waitUntil: 'networkidle2' });

  const content = await page.content();

  await fse.outputFile(`${config.outputPathRoot}/${pageName}.html`, content);
  // await page.screenshot({path: `${config.outputPathRoot}/${pageName}.png`});

  return await getLinksOnPage(page);
}

async function excludeMediaAndIntegrations(page) {
  await page.setRequestInterception(true);

  page.on('request', (pageRequest) => {
    const url = pageRequest._url.split('?')[0].split('#')[0];
    if (requestIsMediaOrBlockedResource(pageRequest, url)) {
      pageRequest.abort();
    } else {
      pageRequest.continue();
    }
  });
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await excludeMediaAndIntegrations(page);

  const pagesToCrawl = ['', '/404'];
  const crawledPages = ['/'];

  while (pagesToCrawl.length >= 1) {
    const pageToCrawl = pagesToCrawl.shift();
    const linksOnPage = await crawlPage(page, pageToCrawl);

    crawledPages.push(pageToCrawl);

    linksOnPage.forEach(element => {
      if (crawledPages.indexOf(element) < 0 && pagesToCrawl.indexOf(element) < 0) {
        pagesToCrawl.push(element);
      }
    });
  }

  await browser.close();
})();
