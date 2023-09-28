const fs = require('fs').promises;
const { randomInt } = require('crypto');

const isTeamWithinQuota = (team, selectedTeamsByContinent) => {
    const continent = team.continent;
    const quota = {
        'Asia': 8,
        'Africa': 9,
        'Middle and North America': 6,
        'South America': 6,
        'Oceania': 1,
        'Europe': 16
    };
    
    return selectedTeamsByContinent[continent].length < quota[continent];
};

const selectTeamsByContinent = (teams, selectedTeamsByContinent) => team => {
    const continent = team.continent;
    if (!selectedTeamsByContinent[continent]) {
        selectedTeamsByContinent[continent] = [];
    }

    if (isTeamWithinQuota(team, selectedTeamsByContinent)) {
        selectedTeamsByContinent[continent].push(team);
    }
};

const addRandomTeams = (selectedTeams, teams, count) => {
    while (selectedTeams.length < count) {
        const randomIndex = randomInt(0, teams.length);
        const randomTeam = teams[randomIndex];
        if (!selectedTeams.includes(randomTeam)) {
            selectedTeams.push(randomTeam);
        }
    }
};

fs.readFile('./data/fifa-ranking.json', 'utf8')
    .then(data => JSON.parse(data))
    .then(teams => {
        const selectedTeamsByContinent = {};
        teams.forEach(selectTeamsByContinent(teams, selectedTeamsByContinent));
        const selectedTeams = Object.values(selectedTeamsByContinent).reduce((acc, val) => acc.concat(val), []);
        addRandomTeams(selectedTeams, teams, 48);
        console.log('Équipes sélectionnées :', selectedTeams);
        console.log('Nombre total d\'équipes sélectionnées :', selectedTeams.length);
    })
    .catch(err => {
        console.error('Erreur lors de la lecture du JSON :', err);
    });
