const getFilteredPlayers = (players, { filterBy, filterByValue, sortBy }) =>
    players
        .filter(player => {
            const topPlayerIds = getSortedPlayersBySteps(
                Array.from(players),
                'desc'
            )
                .filter(
                    (filteredPlayer, key2) =>
                        key2 <= parseInt(players.length / 4, 10)
                )
                .map(mappedPlayer => mappedPlayer.id);
            const bottomPlayerIds = getSortedPlayersBySteps(
                Array.from(players),
                'asc'
            )
                .filter(
                    (filteredPlayer, key2) =>
                        key2 <= parseInt(players.length / 4, 10)
                )
                .map(mappedPlayer => mappedPlayer.id);
            if (filterBy !== '') {
                switch (filterBy) {
                    case 'grade_id':
                        return player.grade_id === filterByValue;
                    case 'year_id':
                        return player.year_id === filterByValue;
                    case 'gender':
                        return player.gender === filterByValue;
                    case 'top':
                        return topPlayerIds.includes(player.id);
                    case 'bottom':
                        return bottomPlayerIds.includes(player.id);
                    default:
                        return player.grade_id === filterByValue;
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

const getSortedPlayersBySteps = (players, type) =>
    players.sort((a, b) => {
        if (type === 'asc') {
            return a.current_steps > b.current_steps ? 1 : -1;
        }
        return a.current_steps < b.current_steps ? 1 : -1;
    });

export default getFilteredPlayers;
