const { winAtLeastOneFinal, winEveryFinalPlayed } = require('../worldCupTraining');

describe('winAtLeastOneFinal', () => {
  it('devrait retourner vrai si le pays a remporté au moins une finale', () => {
    const country = { victories: [1, 2, 3], finals: [1, 2, 3] };
    expect(winAtLeastOneFinal(country)).toBe(true);
  });

  it('devrait retourner faux si le pays n\'a pas remporté de finale', () => {
    const country = { victories: [], finals: [1, 2, 3] };
    expect(winAtLeastOneFinal(country)).toBe(false);
  });
});

describe('winEveryFinalPlayed', () => {
  it('devrait retourner vrai si le pays a remporté chaque finale jouée', () => {
    const country = { victories: [1, 2, 3], finals: [1, 2, 3] };
    expect(winEveryFinalPlayed(country)).toBe(true);
  });

  it('devrait retourner faux si le pays n\'a pas remporté toutes les finales jouées', () => {
    const country = { victories: [1, 2], finals: [1, 2, 3] };
    expect(winEveryFinalPlayed(country)).toBe(false);
  });
});
