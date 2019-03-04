let serverUrl;
if (process.env.NODE_ENV === 'production') {
    serverUrl = 'http://ec2-34-255-2-8.eu-west-1.compute.amazonaws.com';
} else {
    serverUrl = 'http://local.moki.com';
}
export default serverUrl;
