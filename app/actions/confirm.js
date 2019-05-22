export const showConfirm = (message, doConfirm) => ({
    type: 'SHOW_CONFIRM',
    message,
    doConfirm
});

export const hideConfirm = () => ({
    type: 'HIDE_CONFIRM'
});
