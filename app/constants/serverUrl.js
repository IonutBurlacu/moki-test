let serverUrl;
if (process.env.NODE_ENV === 'production') {
    serverUrl = 'http://mokidev.eu-west-1.elasticbeanstalk.com';
} else {
    serverUrl = 'http://local.moki.com';
}
export default serverUrl;
