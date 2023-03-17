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

/*
    persianToGregorian,
    adapted from: https://stackoverflow.com/questions/71421825/how-to-convert-persian-jalali-dates-to-other-18-calendar-dates-in-javascript-w

    credit to Mohsen Alyafei
    https://github.com/MohsenAlyafei
    https://twitter.com/maalyafei
*/
function persianToGregorian(year, month, day) {
  year = parseInt(year, 10);
  month = parseInt(month, 10);
  day = parseInt(day, 10);

  const dFormat = new Intl.DateTimeFormat('en-u-ca-persian',{
    dateStyle:'short',
    timeZone:'UTC'
  });

  let gregorianDate = new Date(Date.UTC(2000,month,day));

  gregorianDate = new Date(gregorianDate.setUTCDate(gregorianDate.getUTCDate() + 226867));

  const gregorianYear = gregorianDate.getUTCFullYear() - 2000 + year;
  gregorianDate = new Date(
    ((gregorianYear < 0) ? '-' : '+') +
    ('00000' + Math.abs(gregorianYear)).slice(-6) +
    '-' +
    ('0' + (gregorianDate.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('0' + (gregorianDate.getUTCDate())).slice(-2)
  );

  let [pM, pD, pY] = [...dFormat.format(gregorianDate).split('/')]
  let i = 0;

  gregorianDate = new Date(
    gregorianDate.setUTCDate(
      gregorianDate.getUTCDate() +
      Math.floor(
        (year * 365.25) +
        (month * 30.44) +
        day -
        (
          (pY.split(' ')[0] * 365.25) +
          (pM * 30.44) +
          (pD*1)
        )
      ) - 2
    )
  );

  while (i < 4) {
    [pM, pD, pY] = [...dFormat.format(gregorianDate).split('/')];
    if (parseInt(pD, 10) === day && parseInt(pM , 10) === month && parseInt(pY.split(' ')[0], 10) === year) {
      return gregorianDate;
    }
    gregorianDate = new Date(gregorianDate.setUTCDate(gregorianDate.getUTCDate() + 1));
    i++;
  }
  console.log('Invalid Persian date');
  throw new Error('Invalid Persian date');
}

const getDatePart = (dateStr, format, part) => {
    return dateStr.substring(format.indexOf(part), format.indexOf(part) + (format.match(new RegExp(part, 'g')) || []).length);
};

const splitDateString = (dateStr, format) => {
    const parts = [
      { name: 'd', index: format.indexOf('D') },
      { name: 'm', index: format.indexOf('M') },
      { name: 'y', index: format.indexOf('Y') },
    ].sort((a, b) => a.index - b.index);

    return {
        y: getDatePart(dateStr, format, 'Y'),
        m: getDatePart(dateStr, format, 'M'),
        d: getDatePart(dateStr, format, 'D'),
        order: parts.map(item => item.name).join('-'),
    }
};

const splitDates = (dateStr, formats) => {
    return formats.map(format => splitDateString(dateStr, format));
};

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

const getMostProbableDate = (dates, dateStr) => {
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

  let originalDateStr = dateStr;
  dateStr = dateStr.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  let dates = [];

  // input probably = ISO YYYY-MM-DD or YYYY-M-D
  let matches = [
    ...dateStr.matchAll(/([0-9]{4})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g)
  ];
  if (matches.length > 0) {
    if (originalDateStr.match(/[۰-۹]/g)) {
        return persianToGregorian(matches[0][1], matches[0][2], matches[0][3]);
    } else {
        return generateDate(matches[0][1], matches[0][2], matches[0][3]);
    }
  }

  // input doesn't follow ISO YYYY-MM-DD
  // lets check for DD-MM-YYYY (or MM-DD-YYYY)
  matches = [
    ...dateStr.matchAll(/([0-9]{1,2})[^0-9]{1,}([0-9]{2})[^0-9]{1,}([0-9]{4})/g)
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
      /([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})[^0-9]{1,}([0-9]{1,2})/g
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
    return getMostProbableDate(dates, originalDateStr);
  }

  // input has no spaces between dates
  // very much guessing now

  // could be YYYYMMDD, DDMMYYYY, MMDDYYYY
  if (dateStr.length === 8) {
    dates = splitDates(dateStr, ['YYYYMMDD', 'DDMMYYYY', 'MMDDYYYY']);
  }

  // could be YYYYMMD, YYYYMDD,
  // or DDMYYYY, MDDYYYY, DMMYYYY, MMDYYYY
  if (dateStr.length === 7) {
    dates = splitDates(dateStr, ['YYYYMMD', 'YYYYMDD', 'DDMYYYY', 'MDDYYYY', 'DMMYYYY', 'MMDYYYY']);
  }

  // or could be YYMMDD, DDMMYY, MMDDYY
  // or worse, could be YYYYMD, DMYYYY, MDYYYY
  if (dateStr.length === 6) {
    dates = splitDates(dateStr, ['YYMMDD', 'DDMMYY', 'MMDDYY', 'YYYYMD', 'DMYYYY', 'MDYYYY']);
  }

  // could be YYMMD, YYMDD,
  // or DDMYY, MDDYY, DMMYY, MMDYY
  if (dateStr.length === 5) {
    dates = splitDates(dateStr, ['YYMMD', 'YYMDD', 'DDMYY', 'MDDYY', 'DMMYY', 'MMDYY']);
  }

  // could be YYMD, DMYY, MDYY
  if (dateStr.length === 4) {
    dates = splitDates(dateStr, ['YYMD', 'DMYY', 'MDYY']);
  }

  //
  return getMostProbableDate(dates, dateStr);
};

export default parseNumericDate;
