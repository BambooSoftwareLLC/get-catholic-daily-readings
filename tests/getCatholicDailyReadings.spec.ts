import { expect } from "chai";
import { getCatholicDailyReadings } from "../src";

describe("get readings tests", () => {
  it("should work", async () => {
    const rawDate = new Date("2022-01-20");
    const tzDate = new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000);
    const reading = await getCatholicDailyReadings(tzDate);
    expect(reading).to.not.equal(null);

    expect(reading.header).to.equal("Thursday of the Second Week in Ordinary Time");
    expect(reading.lectionary).to.equal(314);
    expect(reading.readings.length).to.equal(4);

    const readings = reading.readings;

    const firstReading = readings[0];
    expect(firstReading.header).to.equal("Reading I");
    expect(firstReading.reference).to.equal("1 Sm 18:6-9; 19:1-7");
    expect(firstReading.rawText.trim()).to.equal(`<p>When David and Saul approached<br>
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

    expect(reading.header).to.equal("Feast of the Presentation of the Lord");
    expect(reading.lectionary).to.equal(524);
    expect(reading.readings.length).to.equal(6);

    const readings = reading.readings;

    const firstReading = readings[0];
    expect(firstReading.header).to.equal("Reading I");
    expect(firstReading.reference).to.equal("Mal 3:1-4");
    expect(firstReading.formattedText.trim()).to.equal(`Thus says the Lord GOD:
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

  it("should work for 2-3-2022", async () => {
    const rawDate = new Date("2022-02-03");
    const tzDate = new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000);
    const reading = await getCatholicDailyReadings(tzDate);
    expect(reading).to.not.equal(null);

    expect(reading.header).to.equal("Thursday of the Fourth Week in Ordinary Time");
    expect(reading.lectionary).to.equal(326);
    expect(reading.readings.length).to.equal(4);

    const readings = reading.readings;

    const firstReading = readings[0];
    expect(firstReading.header).to.equal("Reading I");
    expect(firstReading.reference).to.equal("1 Kgs 2:1-4, 10-12");
    expect(firstReading.formattedText.trim()).to.equal(`When the time of David's death drew near,
he gave these instructions to his son Solomon:
\"I am going the way of all flesh.
Take courage and be a man.
Keep the mandate of the Lord, your God, following his ways
and observing his statutes, commands, ordinances, and decrees
as they are written in the law of Moses,
that you may succeed in whatever you do,
wherever you turn, and the Lord may fulfill
the promise he made on my behalf when he said,
'If your sons so conduct themselves
that they remain faithful to me with their whole heart
and with their whole soul,
you shall always have someone of your line
on the throne of Israel.'\"

David rested with his ancestors and was buried in the City of David.
The length of David's reign over Israel was forty years:
he reigned seven years in Hebron
and thirty-three years in Jerusalem.

Solomon was seated on the throne of his father David,
with his sovereignty firmly established.`);
  }).timeout(99999);

  it("should work for 2-8-2022", async () => {
    const rawDate = new Date("2022-02-08");
    const tzDate = new Date(rawDate.valueOf() + rawDate.getTimezoneOffset() * 60 * 1000);
    const reading = await getCatholicDailyReadings(tzDate);
    expect(reading).to.not.equal(null);

    expect(reading.header).to.equal("Tuesday of the Fifth Week in Ordinary Time");
    expect(reading.lectionary).to.equal(330);
    expect(reading.readings.length).to.equal(4);

    const readings = reading.readings;

    const firstReading = readings[0];
    expect(firstReading.header).to.equal("Reading I");
    expect(firstReading.reference).to.equal("1 Kgs 8:22-23, 27-30");
    expect(firstReading.formattedText.trim()).to.equal(`Solomon stood before the altar of the LORD
in the presence of the whole community of Israel,
and stretching forth his hands toward heaven,
he said, \"LORD, God of Israel,
there is no God like you in heaven above or on earth below;
you keep your covenant of mercy with your servants
who are faithful to you with their whole heart.

\"Can it indeed be that God dwells on earth?
If the heavens and the highest heavens cannot contain you,
how much less this temple which I have built!
Look kindly on the prayer and petition of your servant, O LORD, my God,
and listen to the cry of supplication which I, your servant,
utter before you this day.
May your eyes watch night and day over this temple,
the place where you have decreed you shall be honored;
may you heed the prayer which I, your servant, offer in this place.
Listen to the petitions of your servant and of your people Israel
which they offer in this place.
Listen from your heavenly dwelling and grant pardon.\"`);

    const psalm = readings[1];
    expect(psalm.header).to.equal("Responsorial Psalm");
    expect(psalm.reference).to.equal("84:3, 4, 5 and 10, 11");
    expect(psalm.formattedText.trim()).to.equal(`R. (2) How lovely is your dwelling place, Lord, mighty God!
My soul yearns and pines
for the courts of the LORD.
My heart and my flesh
cry out for the living God.
R. How lovely is your dwelling place, Lord, mighty God!
Even the sparrow finds a home,
and the swallow a nest
in which she puts her young—
Your altars, O LORD of hosts,
my king and my God!
R. How lovely is your dwelling place, Lord, mighty God!
Blessed they who dwell in your house!
continually they praise you.
O God, behold our shield,
and look upon the face of your anointed.
R. How lovely is your dwelling place, Lord, mighty God!
I had rather one day in your courts
than a thousand elsewhere;
I had rather lie at the threshold of the house of my God
than dwell in the tents of the wicked.
R. How lovely is your dwelling place, Lord, mighty God!`);

    const alleluia = readings[2];
    expect(alleluia.header).to.equal("Alleluia");
    expect(alleluia.reference).to.equal("Ps 119:36, 29b");
    expect(alleluia.formattedText.trim()).to.equal(`R. Alleluia, alleluia.
Incline my heart, O God, to your decrees;
and favor me with your law.
R. Alleluia, alleluia.`);

    const gospel = readings[3];
    expect(gospel.header).to.equal("Gospel");
    expect(gospel.reference).to.equal("Mk 7:1-13");
    expect(gospel.formattedText.trim()).to.equal(`When the Pharisees with some scribes who had come from Jerusalem
gathered around Jesus,
they observed that some of his disciples ate their meals
with unclean, that is, unwashed, hands.
(For the Pharisees and, in fact, all Jews,
do not eat without carefully washing their hands,
keeping the tradition of the elders.
And on coming from the marketplace
they do not eat without purifying themselves.
And there are many other things that they have traditionally observed,
the purification of cups and jugs and kettles and beds.)
So the Pharisees and scribes questioned him,
\"Why do your disciples not follow the tradition of the elders
but instead eat a meal with unclean hands?\"
He responded,
\"Well did Isaiah prophesy about you hypocrites,
as it is written:

*This people honors me with their lips,
but their hearts are far from me;
In vain do they worship me,
teaching as doctrines human precepts.*

You disregard God's commandment but cling to human tradition.\"
He went on to say,
\"How well you have set aside the commandment of God
in order to uphold your tradition!
For Moses said,
*Honor your father and your mother*,
and *Whoever curses father or mother shall die.*
Yet you say,
'If someone says to father or mother,
\"Any support you might have had from me is *qorban*\"'
(meaning, dedicated to God),
you allow him to do nothing more for his father or mother.
You nullify the word of God
in favor of your tradition that you have handed on.
And you do many such things.\"`);
  }).timeout(99999);
});
