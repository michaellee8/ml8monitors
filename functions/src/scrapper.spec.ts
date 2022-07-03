import { expect } from "chai";
import { getTwfantiEbookLatestChapter } from "./scrapper";

it("correctly scraps the latest chapter of ebook", async function () {
  const chapterNumber = await getTwfantiEbookLatestChapter();
  expect(chapterNumber).to.greaterThan(3000);
});
