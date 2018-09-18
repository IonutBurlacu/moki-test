const getFilteredTeams = (teams, { filterBy, filterByValue, sortBy }) => {
    console.log(teams);
    return teams
        .filter(team => {
            const topTeamIds = getSortedTeamsBySteps(Array.from(teams), 'desc')
                .filter(
                    (filteredTeam, key2) =>
                        key2 <= parseInt(teams.length / 4, 10)
                )
                .map(mappedTeam => mappedTeam.id);
            const bottomTeamIds = getSortedTeamsBySteps(
                Array.from(teams),
                'asc'
            )
                .filter(
                    (filteredTeam, key2) =>
                        key2 <= parseInt(teams.length / 4, 10)
                )
                .map(mappedTeam => mappedTeam.id);
            if (filterBy !== '') {
                switch (filterBy) {
                    case 'top':
                        return topTeamIds.includes(team.id);
                    case 'bottom':
                        return bottomTeamIds.includes(team.id);
                    default:
                        return topTeamIds.includes(team.id);
                }
            } else {
                console.log(team);
                return true;
            }
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'most_steps':
                    return a.current_steps < b.current_steps ? 1 : -1;
                case 'fewest_steps':
                    return a.current_steps > b.current_steps ? 1 : -1;
                case 'name_asc':
                    return a.name > b.name ? 1 : -1;
                case 'name_desc':
                    return a.name < b.name ? 1 : -1;
                case 'increase':
                    return a.percentage < b.percentage ? 1 : -1;
                case 'decrease':
                    return a.percentage > b.percentage ? 1 : -1;
                default:
                    return a.current_steps > b.current_steps ? 1 : -1;
            }
        });
};

const getSortedTeamsBySteps = (teams, type) =>
    teams.sort((a, b) => {
        if (type === 'asc') {
            return a.current_steps > b.current_steps ? 1 : -1;
        }
        return a.current_steps < b.current_steps ? 1 : -1;
    });

export default getFilteredTeams;
