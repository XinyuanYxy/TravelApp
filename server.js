let storage = {};
const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
dotenv.config();
const port = 3000;

const server = app.listen(port, () => {
	console.log(`running on localhost: ${port}`);
});

app.get('/', async (req, res) => {
	res.sendFile(path.resolve('dist/index.html'));
});

app.post('/weather/:city', async (req, res) => {
	try {
		const city = req.params.city;
		console.log('server side getting weather');
		await getGeoNames(city).then(async (data) => {
			let currentWeatherData = await axios.post(
				`https://api.weatherbit.io/v2.0/current?lat=${data.lat}&lon=${data.lng}&key=${process.env.APIKEYWeatherbit}`
			);
			let futureWeatherData = await axios.post(
				`https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.lat}&lon=${data.lng}&key=${process.env.APIKEYWeatherbit}`
			);
			let futureWeatherTemp = futureWeatherData.data.map((data) => ({
				date: data.datetime,
				low_temp: low_temp,
				max_temp: max_temp,
			}));
			res.send({
				currentWeather: currentWeatherData.data.temp,
				currentDate: new Date().getDate(),
				futureWeather: futureWeatherTemp,
			});
		});
	} catch (err) {
		console.log(err);
	}
});
app.get('/imageofTheCity/:city', async (req, res) => {
	try {
		const city = req.params.city;
		const url = `https://pixabay.com/api/?key=${process.env.APIKEYPixably}&q=${city}&image_type=photo`;
		const data = await axios.get(url);
		res.send(data);
	} catch (err) {
		console.log(err);
	}
});
const getGeoNames = async (city) => {
	console.log('im in getgeoname');
	const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.userName}`;
	try {
		const data = await axios.get(url).then((res) => {
			console.log('geonamedata!');
			console.log({
				lat: res.data.geonames[0].lat,
				lng: res.data.geonames[0].lng,
			});
			return {
				lat: res.data.geonames[0].lat,
				lng: res.data.geonames[0].lng,
			};
		});
	} catch (err) {
		console.log(err);
	}
};
