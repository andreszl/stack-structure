var crypto = require('crypto');

export const md5 = (string)  =>{
    return crypto.createHash('md5').update(string).digest("hex");
}
