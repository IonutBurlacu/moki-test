const getFilteredChallenges = (challenges, { filterByValues, sortBy }) =>
    challenges
        .filter(challenge => {
            if (filterByValues.length) {
                const teamIds = challenge.teams.map(team => team.id);
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

export default getFilteredChallenges;
