const getWeather = async (city) => {
	try {
		let weatherData = await axios.post(`/weather/${city}`);
		return weatherData;
	} catch (err) {
		console.log(err);
	}
};
const getImage = async (city) => {
	try {
		let data = await axios.get(`/imageofTheCity/${city}`);
		return data;
	} catch (err) {
		console.log(err);
	}
};

const retrieveData = async (city) => {
	try {
		const city = document.getElementById('city');
		const weatherData = await getWeather(city);
		const image = await getImage(city);
		return {
			weatherData,
			image,
		};
	} catch (err) {
		console.log(err);
	}
};

export { getWeather, retrieveData, getImage };
