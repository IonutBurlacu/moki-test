export const showLoader = timeout => ({
    type: 'SHOW_LOADER',
    timeout
});

export const hideLoader = () => ({
    type: 'HIDE_LOADER'
});
