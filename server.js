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

app.post('/add/:id', async (req, res) => {
	const id = req.params.id;
	console.log(id);
	storage[`${id}`] = req.body;
	res.send('data received');
});

app.get('/getStorageData/:id', async (req, res) => {
	const id = req.params.id;
	const city = storage[`${id}`].city;
	try {
		const weather = await getWeather(id, city);
		const image = await getImage(id, city);
		res.send(storage[`${id}`]);
	} catch (err) {
		console.log(err);
	}
});
app.get('/getWeather/:id/:city', async (req, res) => {
	const id = req.params.id;
	const city = storage[`${id}`].city;
	try {
		const weather = await getWeather(id, city);
		res.send(storage[`${id}`]);
	} catch (err) {
		console.log(err);
	}
});

const getWeather = async (id, city) => {
	try {
		const geoData = await getGeoNames(city);
		console.log('weather geoname data');

		let currentWeatherData = await axios.post(
			`https://api.weatherbit.io/v2.0/current?lat=${geoData.lat}&lon=${geoData.lng}&key=${process.env.APIKEYWeatherbit}`
		);
		let futureWeatherData = await axios.post(
			`https://api.weatherbit.io/v2.0/forecast/daily?lat=${geoData.lat}&lon=${geoData.lng}&key=${process.env.APIKEYWeatherbit}`
		);

		let futureWeatherTemp = futureWeatherData.data.data.map(
			(obj) =>
				`date: ${obj.datetime} <br>
			low_temp: ${obj.low_temp} Ccelsius<br>
			max_temp: ${obj.max_temp} celsius<br>
			<br>
		`
		);
		Object.assign(storage[`${id}`], {
			currentWeather: currentWeatherData.data.data[0].temp,
			futureWeather: futureWeatherTemp,
		});
		console.log('donegettingweather');
	} catch (err) {
		console.log(err);
	}
};

const getImage = async (id, city) => {
	try {
		const url = `https://pixabay.com/api/?key=${process.env.APIKEYPixably}&q=${city}&image_type=photo`;
		const data = await axios.get(url);
		const image = data.data.hits[0].largeImageURL;
		console.log('done getting image');
		Object.assign(storage[id], { image });
	} catch (err) {
		console.log(err);
	}
};
const getGeoNames = async (city) => {
	console.log('im in getgeoname');
	const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${process.env.userName}`;
	try {
		const geoData = await axios.get(url);
		const reply = geoData.data;
		console.log('Donegeonamedata!');
		return {
			lat: reply.geonames[0].lat,
			lng: reply.geonames[0].lng,
		};
	} catch (err) {
		console.log(err);
	}
};
