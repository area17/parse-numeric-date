# parse-numeric-date

Parse numeric based date inputs.

## Mission Statement

Date entry is hard for users. Date pickers, including the native one, aren't always the best for accessibility. 

In his article ["Maybe You Don't Need a Date Picker"](https://adrianroselli.com/2019/07/maybe-you-dont-need-a-date-picker.html#Messaging), Adrian Roselli proposes using a text field which users enter a date into, some client side does some parsing and then some feedback is presented to the user.

It is fairly straight forward to parse a known date format and convert to ISO format. But, what if users don't enter the date in your known format?

Well, that is what `parse-numeric-date` attempts to solve.

## Demo

[https://area17.github.io/parse-numeric-date/](https://area17.github.io/parse-numeric-date/)

## Usage

Firstly, install via npm:

```
$ npm install @area17/parse-numeric-date
```

Import into your JavaScript by:

```
import parseNumericDate from '@area17/parse-numeric-date'
```

And then in your JavaScript:

```
let isoString = parseNumericDate('29/12/25'); // 2025-12-29
```

If you want to have manual control over the locale:

```
let isoString = parseNumericDate('29/12/25', {
    locale: 'en-GB' // will favor d/m/y over m/d/y
}); // 2025-12-29
```

## Examples of what `parse-numeric-date` can parse

* 2022-02-10
* 2022.02.10
* 2022/02/10
* 2022-2-10
* 2022-2-2
* 10 02 2022
* 1 12 2022
* 122922
* 090322
* 9322
* 29122022
* 010122
* 12/29/2022
* 12/29/22
* 01-01-2022
* 01-01-22
* 1-1-22
* 1-1-2022

## Notes

This `parse-numeric-date` works with a big assumption:

*Dates closer to today are better than dates years into the future*

Date pickers for hotels, restaurants or events tend to be for things happening this year or next year. Dates of birth tend to happen from now to 100 years in the past. Retirement ages, mortgage completions tend to happen from now to 100 years in the future. 

If the year difference is larger than 100, its probably useless.
eg: a 29 in the string appear as 2922 rather than 29th of a month, 2022

## Limitations

`parse-numeric-date` can't take natural input such as "December 12, 2022" - it is purely for parsing numeric inputs. Another assumption here is that such date entry, although natural in speech, isn't so natural to write or type - especially if the keyboard has been switched to a numeric keyboard on the users device.

If you want such parsing, perhaps you need:
* [`parse-numeric-date`](https://github.com/kensnyder/any-date-parser)
* [`parse-dob`](https://github.com/HenrikJoreteg/parse-dob)

Both are excellent, but can't parse numeric dates quite as fully as `parse-numeric-date`.

## Comparison with other libraries

You can see a comparison between [`parse-numeric-date`](https://github.com/kensnyder/any-date-parser) and `anyDateParser` and [`parse-dob`](https://github.com/HenrikJoreteg/parse-dob) over on Codepen: [Date parse testing](https://codepen.io/13twelve/pen/rNrRoLB?editors=0010)

`parse-dob` by [@HenrikJoreteg](https://github.com/HenrikJoreteg) was a great inspiration, we think that forking `parse-dob` and removing the previous date restriction would be very interesting.

## Future development

* Add tests (and not just use [https://area17.github.io/parse-numeric-date/](https://area17.github.io/parse-numeric-date/) for testing)
* Add support for other international date formats, such as Chinese and Persian dates.

## Code of Conduct

AREA 17 is dedicated to building a welcoming, diverse, safe community. We expect everyone participating in the AREA 17 community to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it. Please follow it.