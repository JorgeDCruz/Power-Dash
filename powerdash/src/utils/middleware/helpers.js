//Archivo para la encriptación y desencriptación de las contraseñas
import bcrypt from 'bcryptjs'
const helpers = {};

helpers.encryptPassword = async (/** @type {string} */ password) => {
    const salt = await bcrypt.genSalt(10); // hash
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

helpers.matchPassword = async (/** @type {string} */ password, /** @type {string} */ savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword)
    } catch(e) {
        console.log(e)
    }
};

helpers.generateRandomNumberCode =  (/** @type {number} */ length) => {
    const size_digits = Math.pow(10, length - 1);
    return Math.floor(Math.random()*9 * size_digits) + 1 * size_digits;
};

export default helpers;