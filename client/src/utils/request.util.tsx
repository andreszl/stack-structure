import axios from 'axios';

async function request(configuration: any): Promise<any> {
	console.log(configuration);
	console.log(process.env.NODE_ENV);
	const port = process.env.NODE_ENV === 'development' ? '3001' : '3210';
	const base = `http://localhost:${port}/api/` || configuration.base;
	const path = base + configuration.url;

	return axios({
		url: path,
		headers: configuration.headers || {},
		method: configuration.method || 'GET',
		data: configuration.body || {},
	}).then((res) => {
		res.data;
	}).catch((err) => {
		console.log(err);
	});
}

export default request;
