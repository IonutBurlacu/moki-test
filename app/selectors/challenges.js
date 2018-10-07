const getFilteredChallenges = (
    challenges,
    { filterBy, filterByValue, sortBy }
) =>
    challenges
        .filter(challenge => {
            if (filterBy !== '') {
                switch (filterBy) {
                    case 'team_id':
                        const teamIds = challenge.teams.map(team => team.id);
                        return teamIds.includes(filterByValue);
                    default:
                        return true;
                }
            } else {
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

export default getFilteredChallenges;
