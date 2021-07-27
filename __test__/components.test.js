import { generateHtml } from '../src/client/js/generate';

describe('components testing', () => {
	describe('test if generatecard is defined', () => {
		const id = 1;
		const userInput = {
			city: 'New York',
			country: 'USA',
			time: '1st Jan 2022',
			fTime: '14:20',
			fNum: '',
			fDes: '',
			lodging: '',
			items: '',
			notes: '',
		};
		test('generatedcard should be definced', () => {
			expect(generateHtml(id, userInput)).toBeDefined();
		});
	});
});
