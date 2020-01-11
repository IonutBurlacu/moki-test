import moment from 'moment';

export default (type, startDate, endDate) => {
    switch (type) {
        case 'today':
            return moment().format('D MMMM YYYY');
        case 'week':
            return `${moment(startDate).format('D')} - ${moment(endDate).format(
                'D MMMM YYYY'
            )}`;
        case 'month':
            return `${moment(startDate).format('D')} - ${moment(endDate).format(
                'D MMMM YYYY'
            )}`;
        case 'year':
            return `${moment(startDate).format('MMM')} - ${moment(
                endDate
            ).format('MMM YYYY')}`;
        case 'interval':
            return `${moment(startDate).format('D MMM YYYY')} - ${moment(
                endDate
            ).format('D MMM YYYY')}`;
        default:
            return moment().format('D MMMM YYYY');
    }
};
