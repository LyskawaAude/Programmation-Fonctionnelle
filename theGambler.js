const fs = require('fs').promises;
const readJsonFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error('Erreur de lecture du fichier JSON : ' + error.message);
  }
};

// Fonction pure pour générer toutes les combinaisons possibles de résultats de matchs
const generateCombinations = (numMatches) => {
  let combinations = [[]];
  for (let i = 0; i < numMatches; i++) {
    const newCombinations = [];
    // Pour chaque combinaison précédente, ajouter '1', 'X' et '2' à la fin
    for (const previousCombination of combinations) {
      newCombinations.push([...previousCombination, '1']);
      newCombinations.push([...previousCombination, 'X']);
      newCombinations.push([...previousCombination, '2']);
    }
    combinations = newCombinations;
  }
  return combinations; 
};

// Fonction pure pour calculer les gains potentiels pour une combinaison donnée
const calculatePotentialGains = (combination, odds, matches) => {
  let potentialGains = 1.0;
  for (let i = 0; i < combination.length; i++) {
    const matchResult = combination[i];
    const match = matches[i];
    const matchOdds = odds[match.team1];
    if (matchResult === '1') {
      potentialGains *= matchOdds['1']; // Multiplier par les cotes pour '1'
    } else if (matchResult === 'X') {
      potentialGains *= matchOdds['X']; // Multiplier par les cotes pour 'X'
    } else if (matchResult === '2') {
      potentialGains *= matchOdds['2']; // Multiplier par les cotes pour '2'
    }
  }
  return potentialGains;
};

// Fonction principale exécutée de manière asynchrone
(async () => {
  try {
    const matchData = await readJsonFile('./data/match.json');
    const matches = matchData.matches;
    const odds = matchData.odds;
    const numberOfMatches = 2;
    const combinations = generateCombinations(numberOfMatches);
    // Calculer les gains possibles pour chaque combinaison en parallèle en utilisant Promise.all
    const results = await Promise.all(
      combinations.map((combination) => {
        return {
          combination,
          potentialGains: calculatePotentialGains(combination, odds, matches),
        };
      })
    );

    for (const result of results) {
      console.log('Combination:', result.combination);
      console.log('Potential Gains:', result.potentialGains);
      console.log('--------------------------');
    }
  } catch (error) {
    console.error(error.message);
  }
})();