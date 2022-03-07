import { expect } from "chai";
import { Reading } from "../src";
import { parseReadings } from "../src/parser";

describe("parser tests", () => {
  it("should parse formatted text correctly", () => {
    const content = `<p>Paul, an Apostle of Christ Jesus by the will of God<br>
    for the promise of life in Christ Jesus,<br>
    to Timothy, my dear child:<br>
    grace, mercy, and peace from God the Father<br>
    and Christ Jesus our Lord.<br>
    <br>
    I am grateful to God,<br>
    whom I worship with a clear conscience as my ancestors did,<br>
    as I remember you constantly in my prayers, night and day.<br>
    I yearn to see you again, recalling your tears,<br>
    so that I may be filled with joy,<br>
    as I recall your sincere faith<br>
    that first lived in your grandmother Lois<br>
    and in your mother Eunice<br>
    and that I am confident lives also in you.<br>
    <br>
    For this reason, I remind you to stir into flame<br>
    the gift of God that you have through the imposition of my hands.<br>
    For God did not give us a spirit of cowardice<br>
    but rather of power and love and self-control.<br>
    So do not be ashamed of your testimony to our Lord,<br>
    nor of me, a prisoner for his sake;<br>
    but bear your share of hardship for the Gospel<br>
    with the strength that comes from God.<br>
    <br>
    <strong>OR:</strong><br>
    <br>
    <a href="https://bible.usccb.org/bible/titus/1?1">Ti 1:1-5</a><br>
    <br>
    Paul, a slave of God and Apostle of Jesus Christ<br>
    for the sake of the faith of God’s chosen ones<br>
    and the recognition of religious truth,<br>
    in the hope of eternal life<br>
    that God, who does not lie, promised before time began,<br>
    who indeed at the proper time revealed his word<br>
    in the proclamation with which I was entrusted<br>
    by the command of God our savior,<br>
    to Titus, my true child in our common faith:<br>
    grace and peace from God the Father and Christ Jesus our savior.<br>
    <br>
    For this reason I left you in Crete<br>
    so that you might set right what remains to be done<br>
    and appoint presbyters in every town, as I directed you.</p>`;

    const fakeHeader = "Reading I";
    const firstReference = "2 Tm 1:1-8";

    const expectedReadings: Reading[] = [
      {
        header: fakeHeader,
        reference: firstReference,
        formattedText: `Paul, an Apostle of Christ Jesus by the will of God
for the promise of life in Christ Jesus,
to Timothy, my dear child:
grace, mercy, and peace from God the Father
and Christ Jesus our Lord.

I am grateful to God,
whom I worship with a clear conscience as my ancestors did,
as I remember you constantly in my prayers, night and day.
I yearn to see you again, recalling your tears,
so that I may be filled with joy,
as I recall your sincere faith
that first lived in your grandmother Lois
and in your mother Eunice
and that I am confident lives also in you.

For this reason, I remind you to stir into flame
the gift of God that you have through the imposition of my hands.
For God did not give us a spirit of cowardice
but rather of power and love and self-control.
So do not be ashamed of your testimony to our Lord,
nor of me, a prisoner for his sake;
but bear your share of hardship for the Gospel
with the strength that comes from God.`,
      } as Reading,
      {
        header: fakeHeader,
        reference: "Ti 1:1-5",
        formattedText: `Paul, a slave of God and Apostle of Jesus Christ
for the sake of the faith of God's chosen ones
and the recognition of religious truth,
in the hope of eternal life
that God, who does not lie, promised before time began,
who indeed at the proper time revealed his word
in the proclamation with which I was entrusted
by the command of God our savior,
to Titus, my true child in our common faith:
grace and peace from God the Father and Christ Jesus our savior.

For this reason I left you in Crete
so that you might set right what remains to be done
and appoint presbyters in every town, as I directed you.`,
      } as Reading,
    ];

    const readings = parseReadings(fakeHeader, firstReference, content);

    expect(readings.length).to.be.equal(2);

    const readingOne = readings[0];
    const expectedReadingOne = expectedReadings[0];
    expect(readingOne.header).to.equal(expectedReadingOne.header);
    expect(readingOne.reference).to.equal(expectedReadingOne.reference);
    expect(readingOne.formattedText).to.equal(expectedReadingOne.formattedText);

    const readingTwo = readings[1];
    const expectedReadingTwo = expectedReadings[1];
    expect(readingTwo.header).to.equal(expectedReadingTwo.header);
    expect(readingTwo.reference).to.equal(expectedReadingTwo.reference);
    expect(readingTwo.formattedText).to.equal(expectedReadingTwo.formattedText);
  });

  it("should parse multiple readings correctly", () => {
    const content = `<p>When the days were completed for their purification<br />
    according to the law of Moses,<br />
    Mary and Joseph took Jesus up to Jerusalem<br />
    to present him to the Lord,<br />
    just as it is written in the law of the Lord,<br />
    <em>Every male that opens the womb shall be consecrated to the Lord</em>,<br />
    and to offer the sacrifice of<br />
    <em>a pair of turtledoves or two young pigeons</em>,<br />
    in accordance with the dictate in the law of the Lord. <br />
    <br />
    Now there was a man in Jerusalem whose name was Simeon.<br />
    This man was righteous and devout,<br />
    awaiting the consolation of Israel,<br />
    and the Holy Spirit was upon him.<br />
    It had been revealed to him by the Holy Spirit<br />
    that he should not see death<br />
    before he had seen the Christ of the Lord. <br />
    He came in the Spirit into the temple;<br />
    and when the parents brought in the child Jesus<br />
    to perform the custom of the law in regard to him,<br />
    he took him into his arms and blessed God, saying:<br />
    <br />
    “Now, Master, you may let your servant go <br />
    in peace, according to your word,<br />
    for my eyes have seen your salvation,<br />
    which you prepared in the sight of all the peoples:<br />
    a light for revelation to the Gentiles,<br />
    and glory for your people Israel.”<br />
    <br />
    The child's father and mother were amazed at what was said about him;<br />
    and Simeon blessed them and said to Mary his mother,<br />
    “Behold, this child is destined<br />
    for the fall and rise of many in Israel,<br />
    and to be a sign that will be contradicted<br />
    --and you yourself a sword will pierce--<br />
    so that the thoughts of many hearts may be revealed.”<br />
    There was also a prophetess, Anna,<br />
    the daughter of Phanuel, of the tribe of Asher.<br />
    She was advanced in years,<br />
    having lived seven years with her husband after her marriage,<br />
    and then as a widow until she was eighty-four.<br />
    She never left the temple,<br />
    but worshiped night and day with fasting and prayer.<br />
    And coming forward at that very time,<br />
    she gave thanks to God and spoke about the child<br />
    to all who were awaiting the redemption of Jerusalem.<br />
    <br />
    When they had fulfilled all the prescriptions<br />
    of the law of the Lord,<br />
    they returned to Galilee, to their own town of Nazareth.<br />
    The child grew and became strong, filled with wisdom;<br />
    and the favor of God was upon him.<br />
    <br />
    <strong>OR</strong><br />
    <br />
    When the days were completed for their purification<br />
    according to the law of Moses,<br />
    Mary and Joseph took Jesus up to Jerusalem<br />
    to present him to the Lord,<br />
    just as it is written in the law of the Lord,<br />
    <em>Every male that opens the womb shall be consecrated to the Lord</em>,<br />
    and to offer the sacrifice of<br />
    <em>a pair of turtledoves or two young pigeons</em>,<br />
    in accordance with the dictate in the law of the Lord. <br />
    <br />
    Now there was a man in Jerusalem whose name was Simeon.<br />
    This man was righteous and devout,<br />
    awaiting the consolation of Israel,<br />
    and the Holy Spirit was upon him.<br />
    It had been revealed to him by the Holy Spirit<br />
    that he should not see death<br />
    before he had seen the Christ of the Lord. <br />
    He came in the Spirit into the temple;<br />
    and when the parents brought in the child Jesus<br />
    to perform the custom of the law in regard to him,<br />
    he took him into his arms and blessed God, saying:<br />
    <br />
    “Now, Master, you may let your servant go <br />
    in peace, according to your word,<br />
    for my eyes have seen your salvation,<br />
    which you prepared in the sight of all the peoples:<br />
    a light for revelation to the Gentiles,<br />
    and glory for your people Israel.”
 </p>`;

    const fakeHeader = "Gospel";
    const firstReference = "Lk 2:22-40 or 2:22-32";

    const expectedReadings: Reading[] = [
      {
        header: fakeHeader,
        reference: firstReference,
        formattedText: `When the days were completed for their purification
according to the law of Moses,
Mary and Joseph took Jesus up to Jerusalem
to present him to the Lord,
just as it is written in the law of the Lord,
*Every male that opens the womb shall be consecrated to the Lord*,
and to offer the sacrifice of
*a pair of turtledoves or two young pigeons*,
in accordance with the dictate in the law of the Lord.

Now there was a man in Jerusalem whose name was Simeon.
This man was righteous and devout,
awaiting the consolation of Israel,
and the Holy Spirit was upon him.
It had been revealed to him by the Holy Spirit
that he should not see death
before he had seen the Christ of the Lord.
He came in the Spirit into the temple;
and when the parents brought in the child Jesus
to perform the custom of the law in regard to him,
he took him into his arms and blessed God, saying:

\"Now, Master, you may let your servant go
in peace, according to your word,
for my eyes have seen your salvation,
which you prepared in the sight of all the peoples:
a light for revelation to the Gentiles,
and glory for your people Israel.\"

The child's father and mother were amazed at what was said about him;
and Simeon blessed them and said to Mary his mother,
\"Behold, this child is destined
for the fall and rise of many in Israel,
and to be a sign that will be contradicted
--and you yourself a sword will pierce--
so that the thoughts of many hearts may be revealed.\"
There was also a prophetess, Anna,
the daughter of Phanuel, of the tribe of Asher.
She was advanced in years,
having lived seven years with her husband after her marriage,
and then as a widow until she was eighty-four.
She never left the temple,
but worshiped night and day with fasting and prayer.
And coming forward at that very time,
she gave thanks to God and spoke about the child
to all who were awaiting the redemption of Jerusalem.

When they had fulfilled all the prescriptions
of the law of the Lord,
they returned to Galilee, to their own town of Nazareth.
The child grew and became strong, filled with wisdom;
and the favor of God was upon him.`,
      } as Reading,
      {
        header: fakeHeader,
        reference: "",
        formattedText: `OR

When the days were completed for their purification
according to the law of Moses,
Mary and Joseph took Jesus up to Jerusalem
to present him to the Lord,
just as it is written in the law of the Lord,
*Every male that opens the womb shall be consecrated to the Lord*,
and to offer the sacrifice of
*a pair of turtledoves or two young pigeons*,
in accordance with the dictate in the law of the Lord.

Now there was a man in Jerusalem whose name was Simeon.
This man was righteous and devout,
awaiting the consolation of Israel,
and the Holy Spirit was upon him.
It had been revealed to him by the Holy Spirit
that he should not see death
before he had seen the Christ of the Lord.
He came in the Spirit into the temple;
and when the parents brought in the child Jesus
to perform the custom of the law in regard to him,
he took him into his arms and blessed God, saying:

\"Now, Master, you may let your servant go
in peace, according to your word,
for my eyes have seen your salvation,
which you prepared in the sight of all the peoples:
a light for revelation to the Gentiles,
and glory for your people Israel.\"`,
      } as Reading,
    ];

    const readings = parseReadings(fakeHeader, firstReference, content);

    expect(readings.length).to.be.equal(2);

    const readingOne = readings[0];
    const expectedReadingOne = expectedReadings[0];
    expect(readingOne.header).to.equal(expectedReadingOne.header);
    expect(readingOne.reference).to.equal(expectedReadingOne.reference);
    expect(readingOne.formattedText).to.equal(expectedReadingOne.formattedText);

    const readingTwo = readings[1];
    const expectedReadingTwo = expectedReadings[1];
    expect(readingTwo.header).to.equal(expectedReadingTwo.header);
    expect(readingTwo.reference).to.equal(expectedReadingTwo.reference);
    expect(readingTwo.formattedText).to.equal(expectedReadingTwo.formattedText);
  });

  it("should parse another reading correctly", () => {
    const content = `<p>            Thus says the Lord GOD:<br />
    Lo, I am sending my messenger<br />
                to prepare the way before me;<br />
    And suddenly there will come to the temple<br />
                the Lord whom you seek,<br />
    And the messenger of the covenant whom you desire.<br />
                Yes, he is coming, says the Lord of hosts.<br />
    But who will endure the day of his coming?<br />
                And who can stand when he appears?<br />
    For he is like the refiner’s fire,<br />
                or like the fuller’s lye.<br />
    He will sit refining and purifying silver,<br />
                and he will purify the sons of Levi,<br />
    Refining them like gold or like silver<br />
                that they may offer due sacrifice to the Lord.<br />
    Then the sacrifice of Judah and Jerusalem<br />
                will please the Lord,<br />
                as in the days of old, as in years gone by.</p>`;

    const fakeHeader = "Reading 1";
    const firstReference = "Mal 3:1-4";

    const expectedReadings: Reading[] = [
      {
        header: fakeHeader,
        reference: firstReference,
        formattedText: `Thus says the Lord GOD:
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
as in the days of old, as in years gone by.`,
      } as Reading,
    ];

    const readings = parseReadings(fakeHeader, firstReference, content);

    expect(readings.length).to.be.equal(1);

    const readingOne = readings[0];
    const expectedReadingOne = expectedReadings[0];
    expect(readingOne.header).to.equal(expectedReadingOne.header);
    expect(readingOne.reference).to.equal(expectedReadingOne.reference);
    expect(readingOne.formattedText).to.equal(expectedReadingOne.formattedText);
  });

  it("should not have span tags in the final result", () => {
    const content = `<p>            Thus says the Lord GOD:<br />
    Lo, I am sending my messenger<br />
                to prepare the way before me;<br />
    And suddenly there will come to the temple<br />
                the Lord whom you seek,<br />
    And the messenger of the covenant whom you desire.<br />
                Yes, he is coming, says the Lord of hosts.<br />
    But who will endure the day of his coming?<br />
                And who can stand when he appears?<br />
    For he is like the refiner’s fire,<br />
                or like the fuller’s lye.<br />
    He will sit refining and purifying silver,<br />
                and he will purify the sons of Levi,<br />
    Refining them like gold or like silver<br />
                that they may offer due sacrifice to the Lord.<br />
    Then the sacrifice of Judah and Jerusalem<br />
                will please the Lord,<br />
                as in the days of old, as in years gone by.</p></span></span>`;

    const fakeHeader = "Reading 1";
    const firstReference = "Mal 3:1-4";

    const expectedReadings: Reading[] = [
      {
        header: fakeHeader,
        reference: firstReference,
        formattedText: `Thus says the Lord GOD:
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
as in the days of old, as in years gone by.`,
      } as Reading,
    ];

    const readings = parseReadings(fakeHeader, firstReference, content);

    expect(readings.length).to.be.equal(1);

    const readingOne = readings[0];
    const expectedReadingOne = expectedReadings[0];
    expect(readingOne.header).to.equal(expectedReadingOne.header);
    expect(readingOne.reference).to.equal(expectedReadingOne.reference);
    expect(readingOne.formattedText).to.equal(expectedReadingOne.formattedText);
  });
});
