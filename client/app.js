// Personal API Key for OpenWeatherMap API
const apiKey = '4a43c889a024d86915894a250382b482';
// Event listener to add function to existing HTML DOM element
const generate = document.getElementById('generate');
generate.addEventListener('click', async () => {
	try {
		const zipcode = document.getElementById('zip').value;
		const data = await getWebData(zipcode).then((data) => data.json());
		const date = new Date(data.dt * 1000 - data.timezone * 1000);
		const temp = data.main.temp;
		const content = document.getElementById('feelings').value;
		const post = await postData('/add', { date, temp, content });
		const dataFromServer = await getData('/all');
		fillEntries(dataFromServer);
	} catch (error) {
		console.log(error);
	}
});
/* Function to GET Web API Data*/
const getWebData = async (zipcode) => {
	try {
		//have to add http:// before the api link
		const data = await fetch(
			`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}`
		);
		return data;
	} catch (error) {
		console.log(error);
	}
};
/* Function to POST data */
const postData = async (url = '', dataObj = {}) => {
	try {
		const post = await fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataObj),
		});
	} catch (error) {
		console.error(error);
	}
};
/* Function to GET Project Data */
const getData = async (url = '') => {
	try {
		const data = await fetch(url).then((data) => data.json());
		const temp = data.temp;
		const date = data.date;
		const content = data.content;

		return {
			date,
			temp,
			content,
		};
	} catch (error) {
		console.log(error);
	}
};

const fillEntries = (obj = {}) => {
	console.log('clicked');
	let date = document.getElementById('date');
	console.log(date);
	let temp = document.getElementById('temp');
	let content = document.getElementById('content');
	date.innerHTML = `<lable>The Time is:</lable> 
                    <div>${obj.date} </div>`;
	temp.innerHTML = `<lable>The temperature today is: </lable>
                    <div>${obj.temp} </div>`;
	content.innerHTML = `<lable>content: </lable>
                    <div>${obj.content} </div>`;
};
// module.exports = getWebData;
