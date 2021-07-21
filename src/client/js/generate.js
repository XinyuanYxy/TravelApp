function handleSubmit(event) {
	event.preventDefault();
	const generate = document.getElementById('generate');
	console.log('i clicked');
	const city = document.getElementById('city');
	const country = document.getElementById('country');
	const time = document.getElementById('time');
	const fTime = document.getElementById('flighttime');
	const fNum = document.getElementById('flightnumber');
	const fDes = document.getElementById('flightdes');
	const lodging = document.getElementById('lodging');
	const items = document.getElementById('items');
	const notes = document.getElementById('notes');
	const weatherData = Client.retrieveData(city);
	consolo.log(weatherData);
	generateCard(
		city,
		country,
		time,
		ftime,
		fNum,
		fDes,
		lodging,
		items,
		notes,
		weatherData
	);
}

const generateCard = (...args) => {
	//delete button, edit button
	addUlDeleteEditEL();
	const planlist = document.getElementById('planlist');
	let list = document.createElement('li');
	let total = document.getElementById('planlist').childElementCount;
	list.innerHTML = `<div class="card" >
	<h3>Days left: </h3>
	<div id="countdown$"+${total + 1}> ${generateCountdown(args[2])}</div>
	<h3>Depart Time: </h3>
	<div id="date"+${total + 1}>${args[2]}</div>
	<h3>City: </h3>
	<div id="city"+${total + 1}>${args[0]}</div>
	<h3>Country: </h3>
	<div id="country"+${total + 1}>${args[1]}</div>
	<h3>Temperature Now: </h3>
	<div id="temp"+${total + 1}>${args[9].currentWeather}</div>
	<h3>Temperature In Future: </h3>
	<div id="temp"+${total + 1}>${args[9].futureWeather}</div>
	<h3>Temperature Now: </h3>
	<div id="temp"+${total + 1}>${args[9].currentWeather}</div>
	<h3>Flight Time: </h3>
	<div id="ftime"+${total + 1}>${args[3]} </div>
	<h3>Flight Number: </h3>
	<div id="fnum"+${total + 1}>${args[4]}</div>
	<h3>Flight Destination: </h3>
	<div id="fdes"+${total + 1}>${args[5]}</div>
	<h3>Lodging: </h3>
	<div id="lodging"+${total + 1}>Lodging: ${args[6]}</div>
	<h3>Items: </h3>
	<div id="items"+${total + 1}>Items: ${args[7]}</div>
	<h3>Notes: </h3>
	<div id="notes"+${total + 1}>Notes: ${args[8]}</div>
	<button> Edit </button>
	<button> Delete </button>
    </div>
	`;
	planlist.appendChild(list);
};
const generateCountdown = (time) => {
	let countDownDate = new Date(time).getTime();
	let x = setInterval(function () {
		let now = new Date().getTime();
		let distance = countDownDate - now;
		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);
		// Display the result in the element with id="demo"
		document.getElementById('countdown').innerHTML =
			days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
		if (distance < 0) {
			clearInterval(x);
			document.getElementById('demo').innerHTML = 'EXPIRED';
		}
	}, 1000);
};

const addUlDeleteEditEL = () => {
	ul.addEventListener('click', (evt) => {
		console.log('From client side, i clicked');
		if (evt.target.tagName === 'BUTTON') {
			const btn = evt.target;
			const li = btn.parentNode;
			const ul = li.parentNode;
			const children = li.childNodes;
			if (btn.textContent === 'Delete') {
				ul.removeChild(li);
			} else if (btn.textContent === 'Edit') {
				for (let i = 2; i < children.length; i++) {
					if (children[i].nodeName === 'DIV') {
						let input = documentj.createElement('input');
						input.type = 'text';
						input.value = children[i].textContent;
						li.removeChild(children[i]);
					}
				}
				btn.textContent = 'Save';
			} else if (btn.textContent === 'Save') {
				for (let i = 1; i < children.length; i++) {
					if (children[i].nodeName === 'INPUT') {
						let div = documentj.createElement('div');
						input.textContent = children[i].value;
						li.removeChild(children[i]);
					}
				}
				btn.textContent = 'Edit';
			}
		}
	});
};

export { handleSubmit, generateCard, generateCountdown, addUlDeleteEditEL };
