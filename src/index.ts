import puppeteer from "puppeteer";
import { format } from "date-fns";
import { parseReadings } from "./parser";

export async function getCatholicDailyReadings(date?: Date) {
  // get page source
  date = date ?? new Date();
  console.log(date);
  const formattedDate = format(date, "MMddyy");
  console.log(formattedDate);
  const url = `https://bible.usccb.org/bible/readings/${formattedDate}.cfm`;

  // logger.info("launching browser...");
  console.log("launching browser");
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
  console.log("starting page");
  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
  await page.emulateTimezone("America/Detroit");

  // load page
  console.log("loading page");
  await page.goto(url, { waitUntil: "networkidle0" });

  // find lectionary header by class 'b-lectionary'
  console.log("getting lectionary");
  const lectionaryNode = await page.$(".b-lectionary");
  if (!lectionaryNode) {
    throw new Error("couldn't parse lectionary");
  }

  // find readings by class 'b-verse'
  console.log("getting readings");
  const readingNodes = await page.$$(".b-verse");

  const readings: DailyReadings = await getDailyReadingsFromNodes(lectionaryNode, readingNodes);

  return readings;
}

export interface DailyReadings {
  header: string;
  lectionary: number;
  readings: Reading[];
}

export interface Reading {
  header: string;
  reference: string;
  rawText: string;
  nonFormattedText: string;
  formattedText: string;
}

async function getDailyReadingsFromNodes(
  lectionaryNode: puppeteer.ElementHandle<Element>,
  readingNodes: puppeteer.ElementHandle<Element>[]
): Promise<DailyReadings> {
  const readingPromises = readingNodes.map(getReadingsFromNode);
  const promises = [getLectionaryHeaderFromNode(lectionaryNode), getLectionaryNumberFromNode(lectionaryNode), ...readingPromises];

  const [header, lectionary, ...readings] = await Promise.all(promises);
  const flatReadings = (readings as Reading[][]).flat();

  return {
    header,
    lectionary,
    readings: flatReadings,
  } as DailyReadings;
}

async function getLectionaryHeaderFromNode(node: puppeteer.ElementHandle<Element>): Promise<string> {
  return (await node?.$eval("div.innerblock h2", (el) => el.textContent?.trim())) ?? "";
}

async function getLectionaryNumberFromNode(node: puppeteer.ElementHandle<Element>): Promise<number> {
  const lectionaryText = (await node?.$eval("div.innerblock p", (el) => el.textContent?.trim())) ?? "";
  const match = lectionaryText.match(/[0-9]+/gm);
  if (!match) throw new Error("could not parse lectionary number");
  return +match[0];
}

async function getReadingsFromNode(node: puppeteer.ElementHandle<Element>): Promise<Reading[]> {
  // build promises
  const promises = [node?.$eval("div.content-header h3.name", (el) => el.textContent?.trim())];

  const refNode = node?.$("div.address a");
  if (!!refNode) {
    const refPromise = refNode.then((a) => a?.evaluate((el) => el.textContent?.trim()));
    promises.push(refPromise);
  }

  promises.push(node?.$eval("div.content-body", (el) => el.innerHTML.replace(/\&nbsp;/g, "")));

  // resolve promises
  const [header, reference, content] = await Promise.all(promises);

  return parseReadings(header as string, reference as string, content as string);
}
