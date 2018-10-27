import aes from 'crypto-js/aes';
import enc from 'crypto-js/enc-utf8';

const key = 'DYRheRVrrI1zbTisBzOotjMNJAl8qk0dGCoW4ljJ';

export default encrypted => {
    const bytes = aes.decrypt(encrypted, key);

    return JSON.parse(bytes.toString(enc));
};
