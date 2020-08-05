export const showToast = message => ({
    type: 'SHOW_TOAST',
    message
});

export const hideToast = () => ({
    type: 'HIDE_TOAST'
});
