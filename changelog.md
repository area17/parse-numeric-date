# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.0.9
* Two year cut off is now dynamic and not fixed
* Returns null and a `console.log` on none valid entry 

## 0.0.8
Refactored to make it easier to add ambiguous combos - removes a few bytes.

## 0.0.7
Add parsing date types:
* ۱۴۰۰/۱۱/۲۱
* 2022年12月13日
* `13. 12. 2022`
* 13‏/12‏/2022.

## 0.0.6
* Fix trapping no parsed dates when determining highest score
* Add [Jest](https://jestjs.io/) tests: `npm run test`

## 0.0.5
Readme updates for [Date parse testing](https://codepen.io/13twelve/pen/rNrRoLB) comparison with `chrono-node` update.

## 0.0.4
Add parsing of 5 and 7 digit non deliminated dates

## 0.0.3
Add debug dev task

## 0.0.2
Make options, optional 🤦🏻‍♂️

## 0.0.1
Initial release
