const fs = require('fs');
const fileJson = fs.readFileSync('./data/countries.json', 'utf-8');
const data = JSON.parse(fileJson);
const countriesList = [];

data.forEach(countryData => {
  countriesList.push(countryData);
});

const filterFinalistCountries = (countries, predicate) => countries.filter(predicate);

const winAtLeastOneFinal = (country) => country.victories.length > 0;
const winEveryFinalPlayed = (country) => country.victories.length === country.finals.length;
const reachedFinalWithoutWinning = (country) => country.victories.length === 0 && country.finals.length > 0;
const winAndLostFinals = (country) => country.victories.length > 0 && country.finals.length > country.victories.length;

const finalistsWithAtLeastOneWin = filterFinalistCountries(countriesList, winAtLeastOneFinal);
const finalistsWithEveryWin = filterFinalistCountries(countriesList, winEveryFinalPlayed);
const finalistsWithNoWin = filterFinalistCountries(countriesList, reachedFinalWithoutWinning);
const finalistsWithBothWinsAndLosses = filterFinalistCountries(countriesList, winAndLostFinals);

console.log("Pays qui ont au moins remporté une finale :", finalistsWithAtLeastOneWin);
console.log("Pays qui ont remporté chacune des finales qu'ils ont joué :", finalistsWithEveryWin);
console.log("Pays qui ont participé à une finale sans jamais en remporter :", finalistsWithNoWin);
console.log("Pays qui ont à la fois remporté au moins une finale ET perdu au moins une finale :", finalistsWithBothWinsAndLosses);