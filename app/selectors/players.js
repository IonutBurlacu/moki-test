const getFilteredPlayers = (players, { filterByValues, sortBy }) =>
    players
        .filter(player => {
            if (filterByValues.length) {
                const teamIds = player.teams.map(team => team.id);
                const teamIdsIncluding = filterByValues.filter(teamId =>
                    teamIds.includes(teamId)
                );
                return teamIdsIncluding.length > 0;
            }
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'most_steps':
                    return a.daily_steps_current <= b.daily_steps_current
                        ? 1
                        : -1;
                case 'fewest_steps':
                    return a.daily_steps_current >= b.daily_steps_current
                        ? 1
                        : -1;
                case 'most_mvpa':
                    return a.mvpa_minutes_current <= b.mvpa_minutes_current
                        ? 1
                        : -1;
                case 'fewest_mvpa':
                    return a.mvpa_minutes_current >= b.mvpa_minutes_current
                        ? 1
                        : -1;
                case 'most_moki_grade':
                    return a.grade_score_current <= b.grade_score_current
                        ? 1
                        : -1;
                case 'fewest_moki_grade':
                    return a.grade_score_current >= b.grade_score_current
                        ? 1
                        : -1;
                case 'name_asc':
                    return a.first_name >= b.first_name ? 1 : -1;
                case 'name_desc':
                    return a.first_name <= b.first_name ? 1 : -1;
                case 'increase':
                    return a.percentage <= b.percentage ? 1 : -1;
                case 'decrease':
                    return a.percentage >= b.percentage ? 1 : -1;
                case 'age_desc':
                    return a.age <= b.age ? 1 : -1;
                case 'age_asc':
                    return a.age >= b.age ? 1 : -1;
                default:
                    return a.daily_steps_current >= b.daily_steps_current
                        ? 1
                        : -1;
            }
        });

export default getFilteredPlayers;

export const getPlayersDateByType = state => state.players.dateByType;
export const getPlayersDateByStartDate = state => state.players.dateByStartDate;
export const getPlayersDateByEndDate = state => state.players.dateByEndDate;
