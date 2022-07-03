import axios from "axios";
import { JSDOM } from "jsdom";

export async function getTwfantiEbookLatestChapter(): Promise<number> {
  const dirUrl = "https://m.twfanti.com/ShenWangXu_FenYeBan_/dir.html";
  const res = await axios.get(dirUrl);
  const { data } = res;
  const dom = new JSDOM(data);
  const targetNode = dom.window.document.querySelector(
    "body > div > .chapter-list:last-child > label > a",
  );
  if (targetNode === null) {
    throw new Error("targetNode not found");
  }
  const title = targetNode.getAttribute("title");
  if (title === null) {
    throw new Error("title not found on targetNode");
  }
  const rex = /(\d+)/g;
  const match = title.match(rex);
  if (!match) {
    throw new Error("no match found");
  }
  const chapterNumberText = match[0];
  if (!chapterNumberText) {
    throw new Error("no number found");
  }
  const chapterNumber = parseInt(chapterNumberText);
  if (!chapterNumber) {
    throw new Error("chapter number not parsable");
  }
  return chapterNumber;
}
