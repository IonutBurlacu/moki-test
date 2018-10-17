const getFilteredPlayers = (players, { filterByValues, sortBy }) =>
    players
        .filter(player => {
            if (filterByValues.length) {
                const teamIds = player.teams.map(team => team.id);
                return (
                    filterByValues.filter(teamId => teamIds.includes(teamId))
                        .length === filterByValues.length
                );
            }
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'most_steps':
                    return a.current_steps < b.current_steps ? 1 : -1;
                case 'fewest_steps':
                    return a.current_steps > b.current_steps ? 1 : -1;
                case 'name_asc':
                    return a.first_name > b.first_name ? 1 : -1;
                case 'name_desc':
                    return a.first_name < b.first_name ? 1 : -1;
                case 'increase':
                    return a.percentage < b.percentage ? 1 : -1;
                case 'decrease':
                    return a.percentage > b.percentage ? 1 : -1;
                case 'age_desc':
                    return a.age < b.age ? 1 : -1;
                case 'age_asc':
                    return a.age > b.age ? 1 : -1;
                default:
                    return a.current_steps > b.current_steps ? 1 : -1;
            }
        });

export default getFilteredPlayers;
