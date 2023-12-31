const fs = require('fs');
// Fonction pour générer un tir aléatoire (0 ou 1)
const shoot = () => Math.floor(Math.random() * 2);

// Fonction pour calculer la somme d'un tableau
const sumArray = (array) => array.reduce((a, b) => a + b, 0);

// Fonction pour déterminer le vainqueur ou s'il y a égalité
const checkWinner = (tour, team1, team2) => {
  const scoreDiff = sumArray(team1) - sumArray(team2);

  if (Math.abs(scoreDiff) > 2) {
    return scoreDiff > 0 ? team1 : team2;
  }

  if (tour === 5) {
    return scoreDiff !== 0 ? scoreDiff > 0 ? team1 : team2 : "Égalité";
  }

  return null;
};

// Fonction principale pour simuler les tirs au but
const simulatePenaltiesRecursively = (
  team1 = [],
  team2 = [],
  tour = 1,
  randomGenerator = shoot // Utilisation d'une fonction de génération aléatoire injectée
) => {
  const shoot1 = [...team1, randomGenerator()];
  const shoot2 = [...team2, randomGenerator()];
  const newWinner = checkWinner(tour, shoot1, shoot2);

  if (newWinner === null) {
    return simulatePenaltiesRecursively(shoot1, shoot2, tour + 1, randomGenerator);
  } else {
    return { winner: newWinner, team1: shoot1, team2: shoot2 };
  }
};

// Fonction principale pour simuler les tirs au but
const simulatePenaltiesLoop = (randomGenerator = shoot) => {
  const result = simulatePenaltiesRecursively([], [], 1, randomGenerator);
  if (result.winner === "Égalité") {
    return simulatePenaltiesLoop(randomGenerator);
  }
  return result;
};

const results = [];
results.push("Historique :");
const penalties = simulatePenaltiesLoop();
results.push("team1 :");
results.push(JSON.stringify(penalties.team1));
results.push("team2 :");
results.push(JSON.stringify(penalties.team2));

const writeResultsToFile = (results, filePath) => {
  try {
    const resultString = results.join('\n');
    fs.writeFileSync(filePath, resultString, 'utf-8');
    console.log(`Les résultats ont été enregistrés dans le fichier "${filePath}"`);
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier :', error);
  }
};

writeResultsToFile(results, 'resultsPenaltyShootOutWorldCup.txt');
