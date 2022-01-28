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
with the strength that comes from God.`
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
and appoint presbyters in every town, as I directed you.`
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
});
