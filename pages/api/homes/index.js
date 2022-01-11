import { getEligibleHomes } from "../../../utils/apiCalls"


export default async function handler(req, res) {
    var { location, minPrice, maxPrice, bathsMin, bathsMax, bedsMin, bedsMax, sqftMin, sqftMax, sort } = req.query
    var options = {
        method: 'GET',
        url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
        params: {
            location: location,
            page: 1,
            status_type: 'ForSale',
            home_type: 'Houses',
            minPrice: minPrice,
            maxPrice: maxPrice,
            bathsMin: bathsMin,
            bathsMax: bathsMax,
            bedsMin: bedsMin,
            bedsMax: bedsMax,
            sqftMin: sqftMin,
            sqftMax: sqftMax,
            sort: sort
            // buildYearMin: '1',
            // buildYearMax: '1'
        }
        ,
        headers: {
            'x-rapidapi-host': 'zillow-com1.p.rapidapi.com',
            'x-rapidapi-key': process.env.rapid_api_key
        }
    };
    var all_homes = await getEligibleHomes(options)
    res.status(200).json(all_homes)
    // sample url: http://localhost:3000/api/homes?location=King%20County,%20WA&minPrice=200000&maxPrice=650000&bathsMin=1&bathsMax=4&bedsMin=2&bedsMax=4&sqftMin=1000&sqftMax=2100
}