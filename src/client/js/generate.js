let timer = {};
async function handleSubmit(event) {
	event.preventDefault();
	postFormData();
	const planlist = document.getElementById('planlist');
	const id = document.getElementById('planlist').childElementCount + 1;
	const storage = await Client.retrieveData(id);
	const list = generateCard(id, storage);
	planlist.appendChild(list);
	generateCountdown(storage.time, id);
	document.getElementById(`img${id}`).src = storage.image;
}

const generateCard = (id, obj = {}) => {
	//delete button, edit button
	let list = document.createElement('li');
	list.innerHTML = generateHtml(id, obj);
	return list;
};

const generateCountdown = (time, id) => {
	let countDownDate = new Date(time).getTime();
	const cardCountdown = document.getElementById(`cardcountdown${id}`);
	cardCountdown.innerHTML = 'counting';
	if (countDownDate) {
		timer['${id}'] = setInterval(function () {
			let now = new Date().getTime();
			let distance = countDownDate - now;
			let days = Math.floor(distance / (1000 * 60 * 60 * 24));
			let hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((distance % (1000 * 60)) / 1000);
			// Display the result in the element with id="demo"

			if (distance < 0) {
				clearInterval(timer);
				return 'EXPIRED';
			}
			cardCountdown.innerHTML = `${days} d ${hours} h ${minutes} m ${seconds} s`;
		}, 1000);
	}
	cardCountdown.innerHTML = 'You have not put depart time yet!';
};

const generateHtml = (id, obj = {}) => {
	return `<div id = "${id}" class="card" >
	<div ><img id = "img${id}" alt="no img since you have not put city yet"> </div>
	<h5>Days left: </h5>
	<div id="cardcountdown${id}"> Counting... </div>
	<h5>Depart Time: </h5>
	<div id="cardtime${id}"> ${
		obj.time === '' ? 'You have not put any depart time yet' : obj.time
	}
	 </div>
	<h5>City: </h5>
	<div id="cardcity${id}">${
		obj.city === '' ? 'you have not put city yet ' : obj.city
	} </div>
	<h5>Country: </h5>
	<div id="cardcountry${id}">${
		obj.country === '' ? 'you have not put country yet' : obj.country
	}</div>
	<h5>Temperature Now: </h5>
	<div id="cardcurtemp${id}">${
		obj.currentWeather === undefined
			? 'you have not put city yet or check your spelling'
			: obj.currentWeather
	}</div>
	<h5>Temperature In Future: </h5>
	<div id="cardfuturetemp${id}"> ${
		obj.futureWeather === undefined
			? 'you have not put city yet or check your spelling'
			: obj.futureWeather
	}</div>
	<h5>Flight Time: </h5>
	<div id="cardftime${id}">${
		obj.fTime === '' ? 'you have not put flight time yet' : obj.fTime
	} </div>
	<h5>Flight Number: </h5>
	<div id="cardfnum${id}">${
		obj.fNum === '' ? 'you have not put flight number yet' : obj.fNum
	}</div>
	<h5>Flight Destination: </h5>
	<div id="cardfdes${id}">${
		obj.fDes === '' ? 'you have not put flight destination yet' : obj.fDes
	}</div>
	<h5>Lodging: </h5>
	<div id="cardlodging${id}">${
		obj.lodging === '' ? 'you have not put lodging yet' : obj.lodging
	}</div>
	<h5>Items: </h5>
	<div id="carditems${id}">${
		obj.items === '' ? 'you have not put items yet' : obj.items
	}</div>
	<h5>Notes: </h5>
	<div id="cardnotes${id}">${
		obj.notes === '' ? 'you have not put notes yet' : obj.notes
	}</div>
	<div id = "cardbtn${id}">
	<button>Edit</button>
	<button>Delete</button>
	</div>

    </div>
	`;
};
const sendData = async (id, obj = {}) => {
	await axios.post(`/add/${id}`, obj);
};
const postFormData = async () => {
	const city = document.getElementById('city').value;
	const total = document.getElementById('planlist').childElementCount;
	const country = document.getElementById('country').value;
	const time = document.getElementById('time').value;
	const fTime = document.getElementById('flighttime').value;
	const fNum = document.getElementById('flightnumber').value;
	const fDes = document.getElementById('flightdes').value;
	const lodging = document.getElementById('lodging').value;
	const items = document.getElementById('items').value;
	const notes = document.getElementById('notes').value;
	const id = `${total + 1}`;
	const userInput = {
		city,
		country,
		time,
		fTime,
		fNum,
		fDes,
		lodging,
		items,
		notes,
	};
	sendData(id, userInput);
};
const postCardData = async (id) => {
	const cardList = document.getElementById('id');
	const city = document.getElementById(`cardcity${id}`).value;
	const country = document.getElementById(`cardcountry${id}`).value;
	const time = document.getElementById(`cardtime${id}`).value;
	const fTime = document.getElementById(`cardftime${id}`).value;
	const fNum = document.getElementById(`cardfnum${id}`).value;
	const fDes = document.getElementById(`cardfdes${id}`).value;
	const lodging = document.getElementById(`cardlodging${id}`).value;
	const items = document.getElementById(`carditems${id}`).value;
	const notes = document.getElementById(`cardnotes${id}`).value;
	const userInput = {
		city,
		country,
		time,
		fTime,
		fNum,
		fDes,
		lodging,
		items,
		notes,
	};
	sendData(id, userInput);
};
export {
	handleSubmit,
	generateCard,
	generateCountdown,
	postCardData,
	postFormData,
	generateHtml,
	timer,
	sendData,
};
