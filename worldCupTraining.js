const fs = require('fs');
const fileJson = fs.readFileSync('./data/countries.json', 'utf-8');
const data = JSON.parse(fileJson);
const countriesList = [];

data.forEach(countryData => {
  countriesList.push(countryData);
});


// TP1 
const filterFinalistCountries = (countries, predicate) => countries.filter(predicate);

const winAtLeastOneFinal = (country) => country.victories.length > 0;
const winEveryFinalPlayed = (country) => country.victories.length === country.finals.length;
const reachedFinalWithoutWinning = (country) => country.victories.length === 0 && country.finals.length > 0;
const winAndLostFinals = (country) => country.victories.length > 0 && country.finals.length > country.victories.length;

const finalistsWithAtLeastOneWin = filterFinalistCountries(countriesList, winAtLeastOneFinal);
const finalistsWithEveryWin = filterFinalistCountries(countriesList, winEveryFinalPlayed);
const finalistsWithNoWin = filterFinalistCountries(countriesList, reachedFinalWithoutWinning);
const finalistsWithBothWinsAndLosses = filterFinalistCountries(countriesList, winAndLostFinals);

// console.log("Pays qui ont au moins remporté une finale :", finalistsWithAtLeastOneWin);
// console.log("Pays qui ont remporté chacune des finales qu'ils ont joué :", finalistsWithEveryWin);
// console.log("Pays qui ont participé à une finale sans jamais en remporter :", finalistsWithNoWin);
// console.log("Pays qui ont à la fois remporté au moins une finale ET perdu au moins une finale :", finalistsWithBothWinsAndLosses);

// TP2 

// Compter le nombre de victoires d'un pays
const countWins = (country) => country.victories.length;

// Compter le nombre de finales jouées par un pays
const countFinalsPlayed = (country) => country.finals.length;

// Compter le nombre de finales perdues par un pays
const countFinalsLost = (country) => countFinalsPlayed(country) - countWins(country);

// Calculer le taux de réussite en finale d'un pays
const calculateWinPercentage = (country) => {
  const wins = countWins(country);
  const finalsPlayed = countFinalsPlayed(country);
  if (finalsPlayed === 0) return 0;
  return (wins / finalsPlayed) * 100;
};

// Classer les pays par nombre de victoires
const sortByWins = (countries) => countries.sort((a, b) => countWins(b) - countWins(a));

// Classer les pays par nombre de finales jouées
const sortByFinalsPlayed = (countries) => countries.sort((a, b) => countFinalsPlayed(b) - countFinalsPlayed(a));

// Classer les pays par nombre de finales perdues
const sortByFinalsLost = (countries) => countries.sort((a, b) => countFinalsLost(b) - countFinalsLost(a));

// Classer les pays par taux de réussite en finale
const sortByWinPercentage = (countries) => countries.sort((a, b) => calculateWinPercentage(b) - calculateWinPercentage(a));

// Quelle équipe a remporté le plus de Coupe du Monde ?
const getCountryWithMostWins = (countries) => sortByWins(countries)[0];

// Quelle équipe a joué le plus de finale de Coupe du Monde ?
const getCountryWithMostFinalsPlayed = (countries) => sortByFinalsPlayed(countries)[0];

// Quelle équipe a perdu le plus de finales de Coupe du Monde ?
const getCountryWithMostFinalsLost = (countries) => sortByFinalsLost(countries)[0];

// Quelle équipe a le meilleur taux de participation couplé au meilleur taux de réussite en finale de Coupe du Monde ?
const getCountryWithBestWinPercentage = (countries) => sortByWinPercentage(countries)[0];

// Quel est le classement descendant des finalistes (par ordre de victoires et de participations à une finale de Coupe du Monde) ?
const getDescendingFinalistsRanking = (countries) => sortByWins(sortByFinalsPlayed(countries));

// Quel continent a remporté le plus de Coupe du Monde ?
const getContinentWithMostWins = (countries) => {
  const continentWins = {};
  countries.forEach(country => {
    const continent = country.continent;
    if (continentWins[continent]) {
      continentWins[continent] += countWins(country);
    } else {
      continentWins[continent] = countWins(country);
    }
  });
  const sortedContinents = Object.keys(continentWins).sort((a, b) => continentWins[b] - continentWins[a]);
  return sortedContinents[0];
};

console.log("Équipe qui a remporté le plus de Coupe du Monde :", getCountryWithMostWins(countriesList));
console.log("Équipe qui a joué le plus de finales de Coupe du Monde :", getCountryWithMostFinalsPlayed(countriesList));
console.log("Équipe qui a perdu le plus de finales de Coupe du Monde :", getCountryWithMostFinalsLost(countriesList));
console.log("Équipe avec le meilleur taux de participation et de réussite en finale de Coupe du Monde :", getCountryWithBestWinPercentage(countriesList));
console.log("Classement descendant des finalistes par ordre de victoires et de participations en finale de Coupe du Monde :", getDescendingFinalistsRanking(countriesList));
console.log("Pays ayant disputé le plus de finales de Coupe du Monde :", getCountryWithMostFinalsPlayed(countriesList));
console.log("Continent ayant remporté le plus de Coupe du Monde :", getContinentWithMostWins(countriesList));