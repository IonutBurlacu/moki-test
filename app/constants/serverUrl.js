let serverUrl;
if (process.env.NODE_ENV === 'production') {
    serverUrl = 'https://app.moki.technology';
} else if (process.env.NODE_ENV === 'development') {
    serverUrl = 'http://dev.moki.technology';
} else {
    serverUrl = 'http://dev.moki.technology';
}
export default serverUrl;
