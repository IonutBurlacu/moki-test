import aes from 'crypto-js/aes';

const key = 'DYRheRVrrI1zbTisBzOotjMNJAl8qk0dGCoW4ljJ';

export default data => {
    // if (process.env.NODE_ENV === 'local') {
    //     return JSON.stringify(data);
    // }
    const encrypted = aes.encrypt(JSON.stringify(data), key);

    return encrypted.toString();
};
