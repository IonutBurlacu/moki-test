import moment from 'moment';

export default (type, startDate, endDate) => {
    switch (type) {
        case 'today':
            return moment().format('D MMMM YYYY');
        case 'yesterday':
            return moment(startDate).format('D MMMM YYYY');
        case 'last_7_days':
        case 'last_30_days':
        case 'last_90_days':
        case 'week_to_date':
        case 'month_to_date':
        case 'interval':
            if (endDate.diff(startDate, 'days') === 0) {
                return moment(startDate).format('D MMMM YYYY');
            }
            return `${moment(startDate).format('D MMM YYYY')} - ${moment(
                endDate
            ).format('D MMM YYYY')}`;
        default:
            return moment().format('D MMMM YYYY');
    }
};
