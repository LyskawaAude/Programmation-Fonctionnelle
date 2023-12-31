const fs = require('fs').promises;
const readJsonFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    throw new Error('Erreur de lecture du fichier JSON : ' + error.message);
  }
};

const generateCombinations = (nbMatches) => {
  let combinations = [[]];
  for (let i = 0; i < nbMatches; i++) {
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

// Calcule les gains potentiels pour une combinaison donnée
const calculatePotentialGains = (combination, odds, matches) => {
  let potentialGains = 1;
  for (let i = 0; i < combination.length; i++) {
    const matchResult = combination[i];
    const match = matches[i];
    const matchOdds = odds[match.team1];
    if (matchResult === '1') {
      potentialGains *= matchOdds['1'];
    } else if (matchResult === 'X') {
      potentialGains *= matchOdds['X'];
    } else if (matchResult === '2') {
      potentialGains *= matchOdds['2'];
    }
  }
  return potentialGains;
};

(async () => {
  const text = []
  try {
    const matchData = await readJsonFile('./data/match.json');
    const matches = matchData.matches;
    const odds = matchData.odds;
    const numberOfMatches = 3;
    const combinations = generateCombinations(numberOfMatches);
    const costPerCombination = 2;

    const results = await Promise.all(
      combinations.map((combination) => {
        const potentialGains = calculatePotentialGains(combination, odds, matches);
        const totalCost = costPerCombination;
        
        return {
          combination,
          potentialGains,
          totalCost,
        };
      })
    );

    

    for (const result of results) {
      text.push('--------------------------');
      text.push('Combinaisons:', result.combination);
      text.push('Gains possibles:', result.potentialGains);
      text.push('--------------------------');
    }

    text.push('Nombre de combiné possible:', results.length);
    text.push('Coût total des paris:', results.length * costPerCombination);
    text.push('--------------------------');
  } catch (error) {
    console.error(error.message);
  }

  const writeResultsToFile = async (results, filePath) => {
    try {
      const resultString = text.join('\n');
      await fs.writeFile(filePath, resultString, 'utf-8');
      console.log(`Les résultats ont été enregistrés dans le fichier "${filePath}"`);
    } catch (error) {
      console.error('Erreur lors de l\'écriture dans le fichier :', error);
    }
  };

  await writeResultsToFile(text, 'resultsTheGambler.txt');

})();