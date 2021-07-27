import * as card from './generate.js';
import { retrieveData } from './getData';
document.getElementById('planlist').addEventListener('click', async (evt) => {
	if (evt.target.tagName === 'BUTTON') {
		const btn = evt.target;
		const li = btn.parentNode;
		const ul = li.parentNode;
		const children = li.childNodes;
		const id = li.id;
		const city = document.getElementById('city');
		if (btn.textContent === 'Delete') {
			ul.removeChild(li);
			clearInterval(card.timer);
		} else if (btn.textContent === 'Edit') {
			clearInterval(card.timer);
			for (let i = 3; i < children.length; i++) {
				let child = children[i];
				if (child.nodeName === 'DIV') {
					let input = document.createElement('input');
					if (child.id === `cardtime${id}`) {
						input.type = 'date';
					} else if (child.id === `cardftime${id}`) {
						input.type = 'time';
					} else {
						input.type = 'text';
						input.value = children[i].textContent;
					}
					input.id = child.id;
					li.insertBefore(input, children[i]);
					li.removeChild(child);
				}
			}
			btn.textContent = 'Save';
		} else if (btn.textContent === 'Save') {
			clearInterval(card.timer);
			card.postCardData(id);
			const storage = await Client.retrieveData(id);
			const newList = card.generateCard(id, storage);
			ul.insertBefore(newList, li);
			ul.removeChild(li);
			card.generateCountdown(storage.time, id);
			btn.textContent = 'Edit';
		}
	}
});
