import { expect } from "chai";
import { getCatholicDailyReadings } from "../src";

describe("get readings tests", () => {
  it("should work", async () => {
    const rawDate = new Date("2022-01-20");
    const tzDate = new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000);
    const reading = await getCatholicDailyReadings(tzDate);
    expect(reading).to.not.equal(null);

    expect(reading.header).to.equal(
      "Thursday of the Second Week in Ordinary Time"
    );
    expect(reading.lectionary).to.equal(314);
    expect(reading.readings.length).to.equal(4);

    const readings = reading.readings;

    const firstReading = readings[0];
    expect(firstReading.header).to.equal("Reading I");
    expect(firstReading.reference).to.equal("1 Sm 18:6-9; 19:1-7");
    expect(firstReading.rawText.trim()).to
      .equal(`<p>When David and Saul approached<br>
(on David’s return after slaying the Philistine), <br>
women came out from each of the cities of Israel to meet King Saul,<br>
singing and dancing, with tambourines, joyful songs, and sistrums.<br>
The women played and sang:<br>
<br>
“Saul has slain his thousands, <br>
and David his ten thousands.”<br>
<br>
Saul was very angry and resentful of the song, for he thought:<br>
“They give David ten thousands, but only thousands to me.<br>
All that remains for him is the kingship.”<br>
And from that day on, Saul was jealous of David.<br>
<br>
Saul discussed his intention of killing David <br>
with his son Jonathan and with all his servants.<br>
But Saul’s son Jonathan, who was very fond of David, told him:<br>
“My father Saul is trying to kill you.<br>
Therefore, please be on your guard tomorrow morning; <br>
get out of sight and remain in hiding.<br>
I, however, will go out and stand beside my father <br>
in the countryside where you are, and will speak to him about you.<br>
If I learn anything, I will let you know.”<br>
<br>
Jonathan then spoke well of David to his father Saul, saying to him:<br>
“Let not your majesty sin against his servant David, <br>
for he has committed no offense against you, <br>
but has helped you very much by his deeds.<br>
When he took his life in his hands and slew the Philistine, <br>
and the LORD brought about a great victory<br>
for all Israel through him, <br>
you were glad to see it.<br>
Why, then, should you become guilty of shedding innocent blood <br>
by killing David without cause?”<br>
Saul heeded Jonathan’s plea and swore, <br>
“As the LORD lives, he shall not be killed.”<br>
So Jonathan summoned David and repeated the whole conversation to him.<br>
Jonathan then brought David to Saul, and David served him as before.</p>`);
  }).timeout(4000);
  
  it("should work for another date", async () => {
    const rawDate = new Date("2022-02-02");
    const tzDate = new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000);
    const reading = await getCatholicDailyReadings(tzDate);
    expect(reading).to.not.equal(null);

    expect(reading.header).to.equal(
      "Feast of the Presentation of the Lord"
    );
    expect(reading.lectionary).to.equal(524);
    expect(reading.readings.length).to.equal(6);

    const readings = reading.readings;

    const firstReading = readings[0];
    expect(firstReading.header).to.equal("Reading I");
    expect(firstReading.reference).to.equal("Mal 3:1-4");
    expect(firstReading.formattedText.trim()).to
      .equal(`Thus says the Lord GOD:
Lo, I am sending my messenger
to prepare the way before me;
And suddenly there will come to the temple
the Lord whom you seek,
And the messenger of the covenant whom you desire.
Yes, he is coming, says the Lord of hosts.
But who will endure the day of his coming?
And who can stand when he appears?
For he is like the refiner's fire,
or like the fuller's lye.
He will sit refining and purifying silver,
and he will purify the sons of Levi,
Refining them like gold or like silver
that they may offer due sacrifice to the Lord.
Then the sacrifice of Judah and Jerusalem
will please the Lord,
as in the days of old, as in years gone by.`);
  }).timeout(10000);
});
