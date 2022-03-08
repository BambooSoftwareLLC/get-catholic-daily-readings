import { Reading } from ".";
import { JSDOM } from "jsdom";

export function parseReadings(header: string, reference: string, content: string): Reading[] {
  // check for optional readings
  const orLocation = content.indexOf("<strong>OR");
  const mainContent = (orLocation > -1 ? content.substring(0, orLocation) : content);

  const readings: Reading[] = [];
  // parse main reading
  readings.push({
    header,
    reference,
    rawText: mainContent,
    nonFormattedText: parseNonFormatted(mainContent),
    formattedText: parseFormatted(mainContent),
  } as Reading);

  // parse each optional reading
  if (orLocation > -1) {
    const nextReferenceContent = content.substring(orLocation, content.length);
    const nextReference = getNextReference(nextReferenceContent, orLocation);
    const nextContent = nextReferenceContent.substring(nextReference.contentStart, nextReferenceContent.length);
    readings.push(...parseReadings(header, nextReference.reference, nextContent));
  }

  return readings;
}

function parseNonFormatted(content: string): string {
  let nonFormatted = content
    .replace(/<br [/]>/g, "")
    .replace(/<br>/g, "")
    .replace(/<p>/g, "")
    .replace(/<[/]p>/g, "")
    .replace(/<em>/g, "")
    .replace(/<[/]em>/g, "")
    .replace(/<strong>/g, "")
    .replace(/<[/]strong>/g, "")
    .replace(/<span>/g, "")
    .replace(/<[/]span>/g, "")
    .replace(/^\s\s+/g, "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/ \n/g, "\n");

  return nonFormatted.trim();
}

function parseFormatted(content: string): string {
  let formatted = content
    .replace(/<br \/>/g, "\n")
    .replace(/<br>/g, "\n")
    .replace(/<p>/g, "")
    .replace(/<\/p>/g, "")
    .replace(/<em>/g, "*")
    .replace(/<\/em>/g, "*")
    .replace(/\* /g, "*")
    .replace(/<strong>/g, "")
    .replace(/<\/strong>/g, "")
    .replace(/<span>/g, "")
    .replace(/<[/]span>/g, "")
    .replace(/  +/g, "")
    .replace(/\n\n/g, "\n")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/ \n/g, "\n");

  return formatted.trim();
}

function getNextReference(nextContent: string, orLocation: number): { reference: string; contentStart: number } {
  // find next a and /a
  const nextAnchorLocation = nextContent.indexOf("<a ");
  const nextAnchorCloseLocation = nextContent.indexOf("</a>");

  if (nextAnchorLocation < 0 || nextAnchorCloseLocation < 0 && nextContent.startsWith("<strong>OR")) {
    return { reference: "", contentStart: "<strong>".length };
  }

  const nextAnchorHtml = `${nextContent.substring(nextAnchorLocation, nextAnchorCloseLocation)}</a>`;

  // make virtual dom
  const nextAnchorElement = new JSDOM(`<div>${nextAnchorHtml}</div>`);

  // get content inside
  const doc = nextAnchorElement.window.document;
  const anchor = doc.querySelector("a");
  return { reference: anchor?.innerHTML ?? "", contentStart: nextAnchorCloseLocation + "</a>".length };
}
