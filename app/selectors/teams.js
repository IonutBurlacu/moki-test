const getFilteredTeams = (teams, { filterByValues, sortBy }) =>
    teams
        .filter(team => {
            if (filterByValues.length) {
                return filterByValues.includes(team.id);
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

export default getFilteredTeams;
