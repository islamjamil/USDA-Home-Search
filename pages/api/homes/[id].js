
import axios from "axios"
export default async function handler({ query: { id } }, res) {
    var requestData = async (url) => {
        var options = {
            method: 'GET',
            url: url,
            params: { zpid: id },
            headers: {
                'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
                'x-rapidapi-key': process.env.rapid_api_key
            }
        };
        return axios.request(options)
    }
    var { data, data: { address } } = await requestData('https://zillow-com1.p.rapidapi.com/property')
    var imageResponse = await requestData('https://zillow-com1.p.rapidapi.com/images')
    data.images = imageResponse.data.images
    data.fullAddress = `${address.streetAddress}, ${address.city}, ${address.state} ${address.zipcode}`
    res.status(200).json(data)
}