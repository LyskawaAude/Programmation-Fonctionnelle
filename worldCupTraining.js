const fs = require('fs');
const readFile = (filePath) => {
  try {
    const fileJson = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileJson);
  } catch (error) {
    console.error('Erreur de lecture du fichier JSON :', error);
    return [];
  }
};
const countriesList = readFile('./data/countries.json');


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

const results = [];

results.push("Pays qui ont au moins remporté une finale :" + JSON.stringify(finalistsWithAtLeastOneWin));
results.push("Pays qui ont remporté chacune des finales qu'ils ont joué :" + JSON.stringify(finalistsWithEveryWin));
results.push("Pays qui ont participé à une finale sans jamais en remporter :" + JSON.stringify(finalistsWithNoWin));
results.push("Pays qui ont à la fois remporté au moins une finale ET perdu au moins une finale :" + JSON.stringify(finalistsWithBothWinsAndLosses));

// TP2 
const countWins = (country) => country.victories.length;
const countFinalsPlayed = (country) => country.finals.length;
const countFinalsLost = (country) => countFinalsPlayed(country) - countWins(country);
const calculateWinPercentage = (country) => {
  const wins = countWins(country);
  const finalsPlayed = countFinalsPlayed(country);
  if (finalsPlayed === 0) return 0;
  return (wins / finalsPlayed) * 100;
};
const sortByWins = (countries) => countries.sort((a, b) => countWins(b) - countWins(a));
const sortByFinalsPlayed = (countries) => countries.sort((a, b) => countFinalsPlayed(b) - countFinalsPlayed(a));
const sortByFinalsLost = (countries) => countries.sort((a, b) => countFinalsLost(b) - countFinalsLost(a));
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

results.push("Équipe qui a remporté le plus de Coupe du Monde :" + JSON.stringify(getCountryWithMostWins(countriesList)));
results.push("Équipe qui a joué le plus de finales de Coupe du Monde :" + JSON.stringify(getCountryWithMostFinalsPlayed(countriesList)));
results.push("Équipe qui a perdu le plus de finales de Coupe du Monde :" + JSON.stringify(getCountryWithMostFinalsLost(countriesList)));
results.push("Équipe avec le meilleur taux de participation et de réussite en finale de Coupe du Monde :" + JSON.stringify(getCountryWithBestWinPercentage(countriesList)));
results.push("Classement descendant des finalistes par ordre de victoires et de participations en finale de Coupe du Monde :" + JSON.stringify(getDescendingFinalistsRanking(countriesList)));
results.push("Pays ayant disputé le plus de finales de Coupe du Monde :" + JSON.stringify(getCountryWithMostFinalsPlayed(countriesList)));
results.push("Continent ayant remporté le plus de Coupe du Monde :" + JSON.stringify(getContinentWithMostWins(countriesList)));

const writeResultsToFile = (results, filePath) => {
  try {
    const resultString = results.join('\n');
    fs.writeFileSync(filePath, resultString, 'utf-8');
    console.log(`Les résultats ont été enregistrés dans le fichier "${filePath}"`);
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier :', error);
  }
};

writeResultsToFile(results, 'resultsWorldCupTraining.txt');