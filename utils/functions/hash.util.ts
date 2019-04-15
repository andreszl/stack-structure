import crypto from 'crypto';

export const md5 = (string) => {
	crypto.createHash('md5').update(string).digest('hex');
};
