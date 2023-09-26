// Importez les fonctions à tester
const {
  shoot,
  sumArray,
  checkWinner,
  simulatePenaltiesRecursively,
  simulatePenaltiesLoop,
} = require('../penaltyShootOutWorldCup.js'); // Remplacez 'votre-fichier-de-code.js' par le chemin correct vers votre fichier de code

// Test de la fonction shoot
test('shoot génère des tirs aléatoires (0 ou 1)', () => {
  const result = shoot();
  expect(result).toBeGreaterThanOrEqual(0);
  expect(result).toBeLessThanOrEqual(1);
});

// Test de la fonction sumArray
test('sumArray calcule la somme d\'un tableau', () => {
  const array = [1, 2, 3, 4, 5];
  const result = sumArray(array);
  expect(result).toBe(15);
});

// Test de la fonction checkWinner
test('checkWinner détermine le vainqueur ou l\'égalité', () => {
  const team1 = [1, 0, 1, 1, 0];
  const team2 = [0, 1, 0, 1, 1];
  const tour = 5;
  const result = checkWinner(tour, team1, team2);
  expect(result).toBe('Égalité');
});

// Test de la fonction simulatePenaltiesRecursively
test('simulatePenaltiesRecursively simule les tirs au but', () => {
  const result = simulatePenaltiesRecursively([1, 0, 1], [0, 1, 0], 4, () => 0); // Ici, nous utilisons une fonction de génération aléatoire qui retourne toujours 0.
  expect(result.winner).toBe('Égalité');
});

// Test de la fonction simulatePenaltiesLoop
test('simulatePenaltiesLoop simule les tirs au but en boucle', () => {
  const result = simulatePenaltiesLoop(() => 0); // Ici, nous utilisons une fonction de génération aléatoire qui retourne toujours 0.
  expect(result.winner).not.toBe('Égalité');
});
