import axios from 'axios'

async function request(configuration) :  Promise<any>  {

    configuration = configuration || {};
    let base = 'http://localhost:3001/api/' || configuration.base
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