async function handleSubmit(event) {
	event.preventDefault();
	const generate = document.getElementById('generate');
	const city = document.getElementById('city').value;
	const country = document.getElementById('country').value;
	const time = document.getElementById('time').value;
	const fTime = document.getElementById('flighttime').value;
	const fNum = document.getElementById('flightnumber').value;
	const fDes = document.getElementById('flightdes').value;
	const lodging = document.getElementById('lodging').value;
	const items = document.getElementById('items').value;
	const notes = document.getElementById('notes').value;
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
	console.log('sending data to server from clientside');
	await axios.post('/add', userInput);
	console.log('retrieving data');
	const storage = await Client.retrieveData(city);
	generateCard(storage);
}

const generateCard = (obj = {}) => {
	//delete button, edit button
	const planlist = document.getElementById('planlist');
	addUlDeleteEditEL(planlist);
	let list = document.createElement('li');
	let total = document.getElementById('planlist').childElementCount;
	list.innerHTML = `<div class="card" >
	<h3>Days left: </h3>
	<div id="countdown${total + 1}"> ${
		generateCountdown(obj.time) === undefined
			? 'no countdown'
			: generateCountdown(obj.time)
	}</div>
	<h3>Depart Time: </h3>
	<div id="time${total + 1}"> ${
		obj.time === '' ? 'You have not put any depart time yet' : obj.time
	}
	 </div>
	<h3>City: </h3>
	<div id="city${total + 1}">${
		obj.city === '' ? 'you have not put city yet' : obj.city
	} </div>
	<h3>Country: </h3>
	<div id="country${total + 1}">${
		obj.country === '' ? 'you have not put country yet' : obj.country
	}</div>
	<h3>Temperature Now: </h3>
	<div id="temp${total + 1}">${
		obj.currentWeather === undefined
			? 'you have not put city yet'
			: obj.currentWeather
	}</div>
	<h3>Temperature In Future: </h3>
	<div id="temp${total + 1}"> ${
		obj.futureWeather === undefined
			? 'you have not put city yet'
			: obj.futureWeather
	}</div>
	<h3>Flight Time: </h3>
	<div id="ftime${total + 1}">${
		obj.fTime === '' ? 'you have not put flight time yet' : obj.fTime
	} </div>
	<h3>Flight Number: </h3>
	<div id="fnum${total + 1}">${
		obj.fNum === '' ? 'you have not put flight number yet' : obj.fNum
	}</div>
	<h3>Flight Destination: </h3>
	<div id="fdes${total + 1}">${
		obj.fDes === '' ? 'you have not put flight destination yet' : obj.fDes
	}</div>
	<h3>Lodging: </h3>
	<div id="lodging${total + 1}">${
		obj.lodging === '' ? 'you have not put lodging yet' : obj.lodging
	}</div>
	<h3>Items: </h3>
	<div id="items${total + 1}">${
		obj.items === '' ? 'you have not put items yet' : obj.items
	}</div>
	<h3>Notes: </h3>
	<div id="notes${total + 1}">${
		obj.notes === '' ? 'you have not put notes yet' : obj.notes
	}</div>
	<button>Edit</button>
	<button>Delete</button>
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

		if (distance < 0) {
			clearInterval(x);
			return 'EXPIRED';
		}
		return `${days} d ${hours} h ${minutes} m ${seconds} s`;
	}, 1000);
};

const addUlDeleteEditEL = (ele) => {
	ele.addEventListener('click', (evt) => {
		if (evt.target.tagName === 'BUTTON') {
			const btn = evt.target;
			const li = btn.parentNode;
			console.log(li);
			const ul = li.parentNode;
			console.log(ul);
			const children = li.childNodes;
			console.log(btn.textContent === 'Edit');
			const numOfli = ul.childElementCount;
			if (btn.textContent === 'Delete') {
				console.log('clicked delete');
				ul.removeChild(li);
			} else if (btn.textContent === 'Edit') {
				console.log('clicked edit');
				console.log(children);
				for (let i = 3; i < children.length; i++) {
					let child = children[i];
					if (child.nodeName === 'DIV') {
						console.log('nodename===div clause');
						let input = document.createElement('input');
						console.log(child.id === 'time' + numOfli || 'ftime' + numOfli);
						if (child.id === ('time' + numOfli || 'ftime' + numOfli)) {
							input.type = 'date';
						} else {
							input.type = 'text';
							input.value = children[i].textContent;
						}

						li.insertBefore(input, children[i]);
						console.log(li.removeChild(child));
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
