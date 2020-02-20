import moment from 'moment';

export default duration => {
    const momentObject = moment.duration(Math.round(duration), 'minutes');
    if (duration > 1440) {
        return (
            momentObject.days() +
            'd ' +
            momentObject.hours() +
            'h ' +
            momentObject.minutes() +
            'm'
        );
    } else if (duration > 60) {
        return momentObject.hours() + 'h ' + momentObject.minutes() + 'm';
    } else {
        return momentObject.minutes() + 'm';
    }
};
