let serverUrl;
if (process.env.NODE_ENV === 'production') {
    serverUrl = 'https://app.moki.technology';
} else if (process.env.NODE_ENV === 'development') {
    serverUrl = 'http://dev.moki.technology';
} else {
    serverUrl = 'http://local.moki.com';
}
export default serverUrl;
