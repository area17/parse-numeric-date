/*
  TODO:

  Persian Dates:

  ` ١٨‏/١‏/١٩`
  ` ۱۳۸۹/۵/۱۶`

  Chinese Dates:

  1924年9月25日
  25‏/9‏/1924.
*/


let locale = new Intl.NumberFormat().resolvedOptions().locale;
const twoDigitCutoffYear = 60;
const today = new Date().setHours(0, 0, 0, 0);
const thisYear = new Date(today).getFullYear();
const yearInMs = 365.25 * 24 * 60 * 60 * 1000;
const twoYearsInMs = yearInMs * 2;
const hundredYearsInMs = yearInMs * 100;
const getLocaleOrder = () => {
  const dateStr = new Date(2000, 11, 13).toLocaleDateString(locale);
  const parts = [
    { name: 'd', index: dateStr.indexOf('13') },
    { name: 'm', index: dateStr.indexOf('12') },
    { name: 'y', index: dateStr.indexOf('2000') },
  ].sort((a, b) => a.index - b.index);
  return parts.map(item => item.name).join('-');
};

let localeOrder = getLocaleOrder();

// Month in JavaScript is 0-indexed (January is 0, February is 1, etc),
// but by using 0 as the day it will give us the last day of the prior
// month. So passing in 1 as the month number will return the last day
// of January, not February
const daysInMonth = (m, y) => {
  return new Date(y, m, 0).getDate();
};

const make4DigitYear = (y) => {
  if (y.length === 2) {
    return parseInt(y) > twoDigitCutoffYear ? `19${y}` : `20${y}`;
  }
  return y;
}

const generateDate = (y, m, d) => {
  // if year is 2 digits, guess 19XX or 20XX
  y = make4DigitYear(y);

  // convert to numbers
  y = parseInt(y, 10);
  m = parseInt(m, 10);
  d = parseInt(d, 10);

  // stop months being over 12
  m = m > 12 ? null : m;

  // stop day being over how many days are in the month
  d = d > daysInMonth(m, y) ? null : d;

  // pad month and day
  m = m < 10 ? `0${m}` : m;
  d = d < 10 ? `0${d}` : d;

  // test date
  let t = new Date(`${y}-${m}-${d}T00:00:00.000+00:00`);

  if (t instanceof Date && !isNaN(t)) {
    return t;
  } else {
    return null;
  }
};

const getMostProbableDate = (dates) => {
  // make date strs, set order score
  // filter out nulls
  // order by score
  dates = dates
    .map(obj => {
      // make date
      obj.d = generateDate(obj.y, obj.m, obj.d);
      // make year a number
      obj.y = parseInt(make4DigitYear(obj.y), 10);
      // find how far away from this year the date is
      //obj.diff = Math.abs(new Date(today).getFullYear() - obj.y);
      obj.diff = Math.abs(today - obj.d);
      // if the date is in locale order, give it a higher score
      obj.score = localeOrder === obj.order ? 2 : 1;
      //
      // Assumption: dates closer to today are better
      // Why: date pickers for hotels, restaurants, events tend to
      // happen this year or next year. Dates of birth tend to happen
      // from now to 100 years in the past. Retirement ages, mortgage
      // completions tend to happen from now to 100 years in the future
      //
      // if the year difference is larger than 100, its probably useless
      // eg: a 29 made it 2922 rather than 29th of a month, 2022
      if (obj.diff > hundredYearsInMs) {
        obj.score--;
      }
      // year is really quite close to this year, probably more likely
      if (obj.diff < twoYearsInMs) {
        obj.score++;
      }

      return obj;
    })
    // remove any null dates from invalid dates being made
    .filter(obj => obj.d !== null)
    // sort by score, high to low
    .sort((a, b) => {
      return b.score - a.score;
    });

  // whats our highest score?
  const highestScore = dates.length ? dates[0].score : 0;

  // remove anything that hasn't got the lowest score
  // get just the dates
  // order by closest to today
  dates = dates
    // remove anything that doesn't match our high score
    .filter(obj => obj.score === highestScore)
    // sort by year distance, low to high
    .sort((a, b) => {
      return a.diff - b.diff;
    })
    .map(obj => obj.d);

  // return first date (highest score, lowest year difference)
  if (dates.length) {
    return dates[0];
  }
  return null;
};

const parseNumericDate = (dateStr, options) => {
  if (options?.locale) {
    locale = options.locale;
    localeOrder = getLocaleOrder();
  }

  dateStr = dateStr.trim();
  let dates = [];

  // input probably = ISO YYYY-MM-DD or YYYY-M-D
  let matches = [
    ...dateStr.matchAll(/([0-9]{4})[^0-9]{1}([0-9]{1,2})[^0-9]{1}([0-9]{1,2})/g)
  ];
  if (matches.length > 0) {
    return generateDate(matches[0][1], matches[0][2], matches[0][3]);
  }

  // input doesn't follow ISO YYYY-MM-DD
  // lets check for DD-MM-YYYY (or MM-DD-YYYY)
  matches = [
    ...dateStr.matchAll(/([0-9]{1,2})[^0-9]{1}([0-9]{2})[^0-9]{1}([0-9]{4})/g)
  ];
  if (matches.length > 0) {
    dates.push({
      y: matches[0][3],
      m: matches[0][2],
      d: matches[0][1],
      order: 'd-m-y'
    });

    dates.push({
      y: matches[0][3],
      m: matches[0][1],
      d: matches[0][2],
      order: 'm-d-y'
    });
    //
    return getMostProbableDate(dates, dateStr);
  }

  // lets check for DD-MM-YY (or MM-DD-YY), YY-MM-DD
  // and D-M-YY, M-DD-YY
  matches = [
    ...dateStr.matchAll(
      /([0-9]{1,2})[^0-9]{1}([0-9]{1,2})[^0-9]{1}([0-9]{1,2})/g
    )
  ];
  if (matches.length > 0) {
    dates.push({
      y: matches[0][3],
      m: matches[0][2],
      d: matches[0][1],
      order: 'd-m-y'
    });

    dates.push({
      y: matches[0][3],
      m: matches[0][1],
      d: matches[0][2],
      order: 'm-d-y'
    });

    dates.push({
      y: matches[0][1],
      m: matches[0][2],
      d: matches[0][3],
      order: 'y-m-d'
    });
    //
    return getMostProbableDate(dates, dateStr);
  }

  // input has no spaces between dates
  // very much guessing now

  // could be YYYYMMDD, DDMMYYYY, MMDDYYYY
  if (dateStr.length === 8) {
    dates.push({
      y: dateStr.substring(4, 8),
      m: dateStr.substring(2, 4),
      d: dateStr.substring(0, 2),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(4, 8),
      m: dateStr.substring(0, 2),
      d: dateStr.substring(2, 4),
      order: 'm-d-y'
    });

    dates.push({
      y: dateStr.substring(0, 4),
      m: dateStr.substring(4, 6),
      d: dateStr.substring(6, 8),
      order: 'y-m-d'
    });
  }

  // could be YYYYMMD, YYYYMDD,
  // or DDMYYYY, MDDYYYY, DMMYYYY, MMDYYYY
  if (dateStr.length === 7) {
    dates.push({
      y: dateStr.substring(0, 4),
      m: dateStr.substring(4, 6),
      d: dateStr.substring(6, 7),
      order: 'y-m-d'
    });

    dates.push({
      y: dateStr.substring(0, 4),
      m: dateStr.substring(4, 5),
      d: dateStr.substring(5, 7),
      order: 'y-m-d'
    });

    dates.push({
      y: dateStr.substring(3, 7),
      m: dateStr.substring(2, 3),
      d: dateStr.substring(0, 2),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(3, 7),
      m: dateStr.substring(1, 3),
      d: dateStr.substring(0, 1),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(3, 7),
      m: dateStr.substring(0, 2),
      d: dateStr.substring(2, 3),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(3, 7),
      m: dateStr.substring(0, 1),
      d: dateStr.substring(2, 3),
      order: 'd-m-y'
    });
  }

  // or could be YYMMDD, DDMMYY, MMDDYY
  // or worse, could be YYYYMD, DMYYYY, MDYYYY
  if (dateStr.length === 6) {
    dates.push({
      y: dateStr.substring(4, 6),
      m: dateStr.substring(2, 4),
      d: dateStr.substring(0, 2),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(4, 6),
      m: dateStr.substring(0, 2),
      d: dateStr.substring(2, 4),
      order: 'm-d-y'
    });

    dates.push({
      y: dateStr.substring(0, 2),
      m: dateStr.substring(2, 4),
      d: dateStr.substring(4, 6),
      order: 'y-m-d'
    });

    /**/
    dates.push({
      y: dateStr.substring(2, 6),
      m: dateStr.substring(1, 2),
      d: dateStr.substring(0, 1),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(2, 6),
      m: dateStr.substring(0, 1),
      d: dateStr.substring(1, 2),
      order: 'm-d-y'
    });

    dates.push({
      y: dateStr.substring(0, 4),
      m: dateStr.substring(4, 5),
      d: dateStr.substring(5, 6),
      order: 'y-m-d'
    });
  }

  // could be YYMMD, YYMDD,
  // or DDMYY, MDDYY, DMMYY, MMDYY
  if (dateStr.length === 5) {
    dates.push({
      y: dateStr.substring(0, 2),
      m: dateStr.substring(2, 4),
      d: dateStr.substring(4, 5),
      order: 'y-m-d'
    });

    dates.push({
      y: dateStr.substring(0, 2),
      m: dateStr.substring(2, 3),
      d: dateStr.substring(3, 5),
      order: 'y-m-d'
    });

    dates.push({
      y: dateStr.substring(3, 5),
      m: dateStr.substring(2, 3),
      d: dateStr.substring(0, 2),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(3, 5),
      m: dateStr.substring(1, 3),
      d: dateStr.substring(0, 1),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(3, 5),
      m: dateStr.substring(0, 2),
      d: dateStr.substring(2, 3),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(3, 5),
      m: dateStr.substring(0, 1),
      d: dateStr.substring(2, 3),
      order: 'd-m-y'
    });
  }

  // could be YYMD, DMYY, MDYY
  if (dateStr.length === 4) {
    dates.push({
      y: dateStr.substring(2, 4),
      m: dateStr.substring(1, 2),
      d: dateStr.substring(0, 1),
      order: 'd-m-y'
    });

    dates.push({
      y: dateStr.substring(2, 4),
      m: dateStr.substring(0, 1),
      d: dateStr.substring(1, 2),
      order: 'm-d-y'
    });

    dates.push({
      y: dateStr.substring(0, 2),
      m: dateStr.substring(2, 3),
      d: dateStr.substring(3, 4),
      order: 'y-m-d'
    });
  }

  //
  return getMostProbableDate(dates, dateStr);
};

export default parseNumericDate;
