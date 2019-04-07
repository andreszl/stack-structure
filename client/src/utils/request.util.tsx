import axios from 'axios'

async function request(configuration) :  Promise<any>  {

    console.log(process.env.NODE_ENV)
    let port = process.env.NODE_ENV == 'development' ? '3001': '3210'
    configuration = configuration || {};
    let base = `http://localhost:${port}/api/` || configuration.base
    let path = base + configuration.url

    return await axios({
        url : path,
        headers: configuration.headers || {},
        method : configuration.method || 'GET',
        data : configuration.typeSend == 'file' ? configuration.data || {} : JSON.stringify(configuration.data) || {}
    })
    .then( (res) => {
		return res.data
	})
    .catch((err) =>  {
        console.log(err);
    })
}

export default request