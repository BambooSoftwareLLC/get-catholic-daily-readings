import puppeteer from "puppeteer";
import dateformat from "dateformat";

export async function getCatholicDailyReadings(date?: Date) {
  // get page source
  date = date ?? new Date();
  const formattedDate = dateformat(date, "mmddyy");
  const url = `https://bible.usccb.org/bible/readings/${formattedDate}.cfm`;

  // logger.info("launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--proxy-server='direct://'",
      "--proxy-bypass-list=*",
      "--deterministic-fetch",
      "--font-render-hinting=medium",
    ],
  });

  //   logger.info("starting page...");
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.emulateTimezone("America/Detroit");

  // load page
  await page.goto(url, { waitUntil: "networkidle0" });

  // find lectionary header by class 'b-lectionary'
  const lectionaryNode = await page.$(".b-lectionary");

  // find readings by class 'b-verse'
  const readingNodes = await page.$$(".b-verse");

  return [lectionaryNode, ...readingNodes];
}
