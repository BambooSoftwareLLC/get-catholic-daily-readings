import { expect } from "chai";
import { getCatholicDailyReadings } from "../src";

describe("get readings tests", () => {
  it("should return 4 items", async () => {
    const result = (await getCatholicDailyReadings(new Date("2022-01-20"))) ?? [];
    expect(result.length).to.equal(5);
  }).timeout(4000);
});
