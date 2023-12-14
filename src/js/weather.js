const key = '0748d0242cf242f7924183057231312';

/**
 * 
 * @param {*} pCity 
 */
export default async function getWeatherByCity(pCity) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${pCity}`, {
        mode: 'cors'
    });
    if (response.status === 400) {
        throw new TypeError('This city does not exist. Please try another one.');
    }
    const responseJSON = await response.json();
    return responseJSON;
}