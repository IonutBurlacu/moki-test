const getFilteredChallenges = (
    challenges,
    { filterBy, filterByValue, sortBy }
) => {
    console.log(challenges);
    return challenges
        .filter(challenge => {
            const topChallengeIds = getSortedChallengesBySteps(
                Array.from(challenges),
                'desc'
            )
                .filter(
                    (filteredChallenge, key2) =>
                        key2 <= parseInt(challenges.length / 4, 10)
                )
                .map(mappedChallenge => mappedChallenge.id);
            const bottomChallengeIds = getSortedChallengesBySteps(
                Array.from(challenges),
                'asc'
            )
                .filter(
                    (filteredChallenge, key2) =>
                        key2 <= parseInt(challenges.length / 4, 10)
                )
                .map(mappedChallenge => mappedChallenge.id);
            if (filterBy !== '') {
                switch (filterBy) {
                    case 'top':
                        return topChallengeIds.includes(challenge.id);
                    case 'bottom':
                        return bottomChallengeIds.includes(challenge.id);
                    default:
                        return topChallengeIds.includes(challenge.id);
                }
            } else {
                console.log(challenge);
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

const getSortedChallengesBySteps = (challenges, type) =>
    challenges.sort((a, b) => {
        if (type === 'asc') {
            return a.current_steps > b.current_steps ? 1 : -1;
        }
        return a.current_steps < b.current_steps ? 1 : -1;
    });

export default getFilteredChallenges;
